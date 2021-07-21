export const ItemTypes = {
	CARD: 'card',
	START_ELEMENTS: 'START_ELEMENTS',
	CONTENT_ELEMENTS: 'CONTENT_ELEMENTS',
	RESULT_ELEMENTS: 'RESULT_ELEMENTS'
}  

export const buildElements = {
	startScreen: [
		{
			name: 'Cover Page',
			componentName: 'CoverPage',
			itemType: ItemTypes.START_ELEMENTS,
		}
	],
	contentElements: [
		{
			name: 'Single Choice',
			componentName: 'SingleChoice',
			itemType: ItemTypes.CONTENT_ELEMENTS
		},
		{
			name: 'Multi Choice',
			componentName: 'MultiChoice',
			itemType: ItemTypes.CONTENT_ELEMENTS
		},
		{
			name: 'Form Elements',
			componentName: 'FormElements',
			itemType: ItemTypes.CONTENT_ELEMENTS
		}
	],
	resultScreen: [
		{
			name: 'Result Screen',
			componentName: 'ResultScreen',
			itemType: ItemTypes.RESULT_ELEMENTS
		}
	]
};

export const dropBoard = [
	{
		name: 'Start Screen',
		type: 'StartScreen',
		itemType: ItemTypes.START_ELEMENTS
	},
	{
		name: 'Content Elements',
		type: 'ContentElements',
		itemType: ItemTypes.CONTENT_ELEMENTS
	},
	{
		name: 'Results',
		type: 'ResultsScreen',
		itemType: ItemTypes.RESULT_ELEMENTS
	}
];

export const formElements = [
	{
		name: 'First Name',
		componentName: 'InputText',
		itemType: 'FORM_ELEMENTS'
	},
	{
		name: 'Last Name',
		componentName: 'InputText',
		itemType: 'FORM_ELEMENTS'
	},
	{
		name: 'Email',
		componentName: 'InputTextEmail',
		itemType: 'FORM_ELEMENTS'
	},
]