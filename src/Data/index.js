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

export const formElementsDropBoard = [
	{
		name: 'Form Fields',
		type: 'FormFields',
		itemType: 'FORMFIELDS_ELEMENTS'
	}
]

export const formElements = [
	{
		name: 'First Name',
		componentName: 'FirstName',
		itemType: 'FORMFIELDS_ELEMENTS',
		required: false,
		placeholder: '',
		value: '',
	},
	{
		name: 'Last Name',
		componentName: 'LastName',
		itemType: 'FORMFIELDS_ELEMENTS',
		required: false,
		placeholder: '',
		value: '',
	},
	{
		name: 'Email',
		componentName: 'Email',
		itemType: 'FORMFIELDS_ELEMENTS',
		required: false,
		placeholder: '',
		value: ''
	},
	{
		name: 'Short Text Answer',
		componentName: 'ShortTextAnswer',
		itemType: 'FORMFIELDS_ELEMENTS',
		required: false,
		placeholder: '',
		value: ''
	},
	{
		name: 'Long Text Answer',
		componentName: 'LongTextAnswer',
		itemType: 'FORMFIELDS_ELEMENTS',
		required: false,
		placeholder: '',
		value: ''
	},
]
export const designColors = [
	{
		name: 'Font Color',
		itemName: 'fontColor'
	},
	{
		name: 'Background Color',
		itemName: 'backgroundColor'
	},
	{
		name: 'Button Color',
		itemName: 'buttonColor'
	},
	{
		name: 'Button Text Color',
		itemName: 'buttonTextColor'
	},
	{
		name: 'Answers Highlight Box Color',
		itemName: 'answersHighlightBoxColor'
	},
	{
		name: 'Answer Border Color',
		itemName: 'answerBorderColor'
	},
	{
		name: 'Background Container Color',
		itemName: 'backgroundContainerColor'
	},
]

export const initColorState = {
	opacity: 1,

	fontFamily: null,
	fontFamilyValue: '',
	
	backgroundColor: {
		r: '255',
		g: '255',
		b: '255',
		a: '1'
	},

	buttonColor: {
		r: '1',
		g: '111',
		b: '222',
		a: '1'
	},

	buttonTextColor: {
		r: '255',
		g: '255',
		b: '255',
		a: '1'
	},

	answersHighlightBoxColor: {
		r: '232',
		g: '238',
		b: '244',
		a: '1'
	},

	answerBorderColor: {
		r: '180',
		g: '220',
		b: '255',
		a: '1'
	},

	backgroundContainerColor: {
		r: '255',
		g: '255',
		b: '255',
		a: '1'
	},

	fontColor: {
		r: '0',
		g: '0',
		b: '0',
		a: '1'
	},
}
