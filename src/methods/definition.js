export default {
	type: "items",
	component: "accordion",
	items: {
		dimensions: {
			uses: "dimensions",
			min: 1,
			max: 8
		},
		appearance: {
			uses: "settings",
			type: "items",
			items: {
				buttonStyling: {
					label: "Buttons",
					type: "items",
					items: {
						buttonColor: {
							label: "Button color",
							component: "color-picker",
							type: "object",
							defaultValue: {
								color: "#009845",
								index: "-1"
							},
							ref: "props.buttonBackgroundColor",
						},
						buttonHoverColor: {
							label: "Button hover color",
							component: "color-picker",
							type: "object",
							defaultValue: {
								color: "#14b65a",
								index: "-1"
							},
							ref: "props.buttonBackgroundColorHover"
						}
					},
				},
				parentItemStyling: {
					label: "Parent Item",
					type: "items",
					items: {
						backgroundColor: {
							label: "Background color",
							component: "color-picker",
							type: "object",
							defaultValue: {
								color: "#E6EBF2",
								index: "-1"
							},
							ref: "props.parentItemBackgroundColor",
						},
						backgroundColorHover: {
							label: "Background hover color",
							component: "color-picker",
							type: "object",
							defaultValue: {
								color: "#D3D9E6",
								index: "-1"
							},
							ref: "props.parentItemBackgroundColorHover",
						}
					}
				},
				SubItemStyling: {
					label: "Sub-item",
					type: "items",
					items: {
						backgroundColor: {
							label: "Background color",
							component: "color-picker",
							type: "object",
							defaultValue: {
								color: "#FAFAFD",
								index: "-1"
							},
							ref: "props.subItemBackgroundColor",
						},
						backgroundColorHover: {
							label: "Background hover color",
							component: "color-picker",
							type: "object",
							defaultValue: {
								color: "#DADFE6",
								index: "-1"
							},
							ref: "props.subItemBackgroundColorHover",
						}
					}
				},
				lastItemStyling: {
					label: "Last Item",
					type: "items",
					items: {
						indent: {
							label: "Indent",
							component: "switch",
							type: "boolean",
							options: [{
								value: true,
								label: "Yes"
							}, {
								value: false,
								label: "No"
							}],
							defaultValue: false,
							ref: "props.lastItemIndent",
						},
						backgroundColor: {
							label: "Background color",
							component: "color-picker",
							type: "object",
							defaultValue: {
								color: "#ffffff",
								index: "-1"
							},
							ref: "props.lastItemBackgroundColor",
						},
						backgroundColorHover: {
							label: "Background hover color",
							component: "color-picker",
							type: "object",
							defaultValue: {
								color: "#ffffff",
								index: "-1"
							},
							ref: "props.lastItemBackgroundColorHover",
						}
					}
				},
				searchStyling: {
					label: "Search text",
					type: "items",
					items: {
						backgroundColor: {
							label: "Highlight Color",
							component: "color-picker",
							type: "object",
							defaultValue: {
								color: "#93f197",
								index: "-1"
							},
							ref: "props.highlightColor",
						}
					}
				}
			}
		},
		about: {
			type: "items",
			label: "About",
			items: {
				Name: {
					label: 'Name: Collapsible Accordion',
					component: 'text'
				},
				Version: {
					label: 'Version: 1.0.0',
					component: 'text'
				},
				Author: {
					label: 'Author: Christopher Braley',
					component: 'text'
				},
			}
		}
	}
};
