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
			id: 'CoverPage',
			itemType: ItemTypes.START_ELEMENTS
		}
	],
	contentElements: [
		{
			name: 'Short Questions',
			id: 'ShortQuestions',
			itemType: ItemTypes.CONTENT_ELEMENTS
		},
		{
			name: 'Long Questions',
			id: 'LongQuestions',
			itemType: ItemTypes.CONTENT_ELEMENTS
		}
	],
	resultScreen: [
		{
			name: 'Result Screen',
			id: 'ResultScreen',
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
