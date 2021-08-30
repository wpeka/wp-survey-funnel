import * as data from "../../Data/index";


it("ItemTypes test",()=>{
    const expectedItemTypes = 	{ CARD: 'card',
	START_ELEMENTS: 'START_ELEMENTS',
	CONTENT_ELEMENTS: 'CONTENT_ELEMENTS',
	RESULT_ELEMENTS: 'RESULT_ELEMENTS'
    }
    const receivedItemTypes = data.ItemTypes;

    expect(expectedItemTypes).toMatchObject(receivedItemTypes);

})

it("buildElements test",()=>{
    const expectedbuildElements = 	{
        startScreen: [
            {
                name: 'Cover Page',
                componentName: 'CoverPage',
                itemType: data.ItemTypes.START_ELEMENTS,
            }
        ],
        contentElements: [
            {
                name: 'Single Choice',
                componentName: 'SingleChoice',
                itemType: data.ItemTypes.CONTENT_ELEMENTS
            },
            {
                name: 'Multi Choice',
                componentName: 'MultiChoice',
                itemType: data.ItemTypes.CONTENT_ELEMENTS
            },
            {
                name: 'Form Elements',
                componentName: 'FormElements',
                itemType: data.ItemTypes.CONTENT_ELEMENTS
            }
        ],
        resultScreen: [
            {
                name: 'Results Page',
                componentName: 'ResultScreen',
                itemType: data.ItemTypes.RESULT_ELEMENTS
            }
        ]
    };
    const receivedbuildElements = data.buildElements;

    expect(expectedbuildElements).toMatchObject(receivedbuildElements);

})

it("dropBoard test",()=>{
    const expecteddropBoard = 	[
        {
            name: 'Start Screen',
            type: 'StartScreen',
            itemType: data.ItemTypes.START_ELEMENTS
        },
        {
            name: 'Content Elements',
            type: 'ContentElements',
            itemType: data.ItemTypes.CONTENT_ELEMENTS
        },
        {
            name: 'Results Screen',
            type: 'ResultsScreen',
            itemType: data.ItemTypes.RESULT_ELEMENTS
        }
    ];
    const receiveddropBoard = data.dropBoard;

    expect(expecteddropBoard).toEqual(expect.arrayContaining(receiveddropBoard));


})

it("formElementsDropBoard test",()=>{
    const expectedformElementsDropBoard = 	[
        {
            name: 'Form Fields',
            type: 'FormFields',
            itemType: 'FORMFIELDS_ELEMENTS'
        }
    ]
    const receivedformElementsDropBoard = data.formElementsDropBoard;

    expect(expectedformElementsDropBoard).toEqual(expect.arrayContaining(receivedformElementsDropBoard));

})

it("formElements test",()=>{
    const expectedformElements = 	 [
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
    ];
    const receivedformElements = data.formElements;

    expect(expectedformElements).toEqual(expect.arrayContaining(receivedformElements));

})

it("designColors test",()=>{
    const expecteddesignColors =  [
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
    const receiveddesignColors = data.designColors;

    expect(expecteddesignColors).toEqual(expect.arrayContaining(receiveddesignColors));

})


it("initColorState test",()=>{
    const expectedinitColorState =   {
        opacity: 0,
    
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
    const receivedinitColorState = data.initColorState;

    expect(expectedinitColorState).toMatchObject(receivedinitColorState);

})

it("shortcodeTypes test",()=>{
    const expectedshortcodeTypes =  [
		{
			name: 'Responsive',
			id: 'responsive',
			helpText: "This code will place a responsive survey on your website."
		},
		{
			name: 'Full Page',
			id: 'fullpage',
			helpText: "This‌ ‌code‌ ‌will‌ ‌place‌ ‌a‌ ‌full-page‌ ‌survey‌ ‌on‌ ‌your‌ ‌website.‌"
		},
		{
			name: 'Custom',
			id: 'custom',
			helpText: "This code will place a custom sized survey on your website.",
			disabled: true,
		}
	]
    
    const receivedshortcodeTypes = data.shortcodeTypes;

    expect(expectedshortcodeTypes).toEqual(expect.arrayContaining(receivedshortcodeTypes));

})


it("popupInitialState test",()=>{
    const expectedpopupInitialState =  {
        active: false,
        targettingOptions: {
            devices: [
                {
                    name: 'Desktop',
                    checked: true,
                    id: 'desktop',
                },
                {
                    name: 'Mobile',
                    checked: true,
                    id: 'mobile',
                },
                {
                    name: 'Tablet',
                    checked: true,
                    id: 'tablet'
                }
            ],
            triggerPage: 'triggerOnSpecific',
            selectedPagesAndPosts: [],
        },
        behaviourOptions: {
            launchOptions: {
                launchWhen: 'afterPageLoads',
                afterTimeDelay: 5,
                afterExitIntent: 'low',
                afterScrollPercentage: 20,
            },
            frequencyOptions: {
                frequency: 'alwaysShow',
                hideFor: 3,
                dontShowAgain: false,
            }
        }
    }
    const receivedpopupInitialState = data.popupInitialState;

    expect(expectedpopupInitialState).toMatchObject(receivedpopupInitialState);

})
it("shareTabsData test",()=>{
    const expectedshareTabsData =  [
		{
			name: 'Share Shortcode',
			description: ' ‌Copy‌ ‌and‌ ‌paste‌ ‌this‌ ‌into‌ ‌any‌ ‌post‌ ‌or‌ ‌page‌ ‌you‌ ‌want‌ ‌the‌ ‌survey‌ ‌to‌ ‌be‌ ‌displayed.‌',
			id: 'shortcode',
		},
		{
			name: 'Popup',
			description: '‌Enable‌ ‌a‌ ‌pop-up‌ ‌survey‌ ‌on‌ ‌selected‌ ‌pages',
			id: 'popup'
		}
	]
    const receivedshareTabsData = data.shareTabsData;

    expect(expectedshareTabsData).toEqual(expect.arrayContaining(receivedshareTabsData));

})