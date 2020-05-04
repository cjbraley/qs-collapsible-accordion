
export default async function ($element, layout, self, qlik, $) {

	// This runs when the data is changed or a property is changed but not when the chart is resized
	// console.log("Paint ran")

	////////////////////////
	// HELPER FUNCTIONS
	////////////////////////

	function handleDataUpdate(displayArr, dataArr) {
		let isInDisplay = null;
		let isInData = null;
		displayArr.map(displayRow => {
			isInData = false;
			dataArr.map(dataRow => {
				// if exists in both
				if (displayRow.id === dataRow.id) {
					isInData = true;
					displayRow.included = true;
					if (displayRow.children.length > 0 && dataRow.children.length > 0) {
						handleDataUpdate(displayRow.children, dataRow.children)
					}
				}
			})
			if (!isInData) {
				displayRow.included = false;
				// set all children of displayRow to have included = false
				if (displayRow.children.length > 0) {
					setPropertyRecursive(displayRow.children, 'included', false)
				}
			}
		})

		// Find what's in data but not in display
		dataArr.map(dataRow => {
			isInDisplay = false;
			displayArr.map(displayRow => {
				// if exists in both
				if (displayRow.id === dataRow.id) {
					isInDisplay = true;
				}
			})

			if(!isInDisplay){
				displayArr.push(dataRow);
			}
		})
	}

	function setPropertyRecursive(arr, propertyName, value) {
		arr.map(arrRow => {
			arrRow[propertyName] = value;
			if (arrRow.children.length) {
				setPropertyRecursive(arrRow.children, propertyName, value);
			}
		})
	}

	//////////////////
	// Init
	/////////////////
	const state = self.$scope.state;
	const hypercube = layout.qHyperCube;

	self.$scope.props= {};
	self.$scope.props.buttonBackgroundColor = layout.props.buttonBackgroundColor ? layout.props.buttonBackgroundColor.color : "#009845";
	self.$scope.props.buttonBackgroundColorHover = layout.props.buttonBackgroundColorHover ? layout.props.buttonBackgroundColorHover.color : "#00ff00";

	self.$scope.props.parentItemBackgroundColor = layout.props.parentItemBackgroundColor ? layout.props.parentItemBackgroundColor.color : "#E6EBF2";
	self.$scope.props.parentItemBackgroundColorHover = layout.props.parentItemBackgroundColorHover ? layout.props.parentItemBackgroundColorHover.color : "#D3D9E6";
	self.$scope.props.subItemBackgroundColor = layout.props.subItemBackgroundColor ? layout.props.subItemBackgroundColor.color : "#FAFAFD";
	self.$scope.props.subItemBackgroundColorHover = layout.props.subItemBackgroundColorHover ? layout.props.subItemBackgroundColorHover.color : "#DADFE6";
	self.$scope.props.lastItemBackgroundColor = layout.props.lastItemBackgroundColor ? layout.props.lastItemBackgroundColor.color : "#FFF";
	self.$scope.props.lastItemBackgroundColorHover = layout.props.lastItemBackgroundColorHover ? layout.props.lastItemBackgroundColorHover.color : "#FFF";
	self.$scope.props.lastItemIndent = layout.props.lastItemIndent ? false : "-30px";

	self.$scope.props.highlightColor = layout.props.highlightColor ? layout.props.highlightColor.color : "#93f197";



	const data = []

	// Receive data and create a nested array
	hypercube.qDataPages[0].qMatrix.map(qRow => {
		qRow.reduce((acc, val, levelIndex) => {
			const rowValue = val.qText;
			const rowId = val.qElemNumber
			// does this value exist at this level?

			let existingValueIndex = -1;


			for (var i = 0; i < acc.length; i++) {
				if (acc[i].id === rowId) {
					existingValueIndex = i;
					break;
				}
			}

			if (existingValueIndex > -1) {
				return acc[existingValueIndex].children
			} else {
				const newData = {
					id: rowId,
					value: rowValue,
					displayValue: rowValue,
					included: true,
					expanded: false,
					isParent: !!(levelIndex === 0),
					search: true,
					children: []
				}
				acc.push(newData)
				return acc[acc.length - 1].children
			}

		}, data)

	});


	// If display doesn't exist, create display as data


	if (!self.$scope.display) {
		self.$scope.display = data;
	} else {
		handleDataUpdate(self.$scope.display, data)
	}

	// run the search process
	self.$scope.searchUpdate(self.$scope.searchString)


	return qlik.Promise.resolve();


	// self.resize();
	// console.log("end of paint");
}
