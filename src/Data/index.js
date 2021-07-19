export const ItemTypes = {
	CARD: 'card',
	START_ELEMENTS: 'start-elements',
	CONTENT_ELEMENTS: 'content-elements',
	RESULT_ELEMENTS: 'result-elements'
}  

export const buildElements = {
	startScreen: [
		{
			name: 'Cover Page',
			id: 'cover-page',
			itemType: ItemTypes.START_ELEMENTS
		}
	],
	contentElements: [
		{
			name: 'Short Questions',
			id: 'short-questions',
			itemType: ItemTypes.CONTENT_ELEMENTS
		},
		{
			name: 'Long Questions',
			id: 'long-questions',
			itemType: ItemTypes.CONTENT_ELEMENTS
		}
	],
	resultScreen: [
		{
			name: 'Result Screen',
			id: 'result-screen',
			itemType: ItemTypes.RESULT_ELEMENTS
		}
	]
};

export const dropBoard = [
	{
		name: 'Start Screen',
		type: 'start-screen',
		itemType: ItemTypes.START_ELEMENTS
	},
	{
		name: 'Content Elements',
		type: 'content-elements',
		itemType: ItemTypes.CONTENT_ELEMENTS
	},
	{
		name: 'Results',
		type: 'results-screen',
		itemType: ItemTypes.RESULT_ELEMENTS
	}
];
