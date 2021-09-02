import React, { createContext, useContext, useEffect, useState } from 'react'
import fetchData from '../../HelperComponents/fetchData';
import { BuildContext } from './BuildContext';
import moment from 'moment';

export function ReportContextProvider(props) {
	
	const [reports, setReports] = useState([]);
	const [currentReportSelected, setCurrentReportSelected] = useState(null);
	const [dates, setDates] = useState({
        startDate: null,
        endDate: null,
    });

	const [insights, setInsights] = useState({
		List: {
			CONTENT_ELEMENTS: [],
		},
		totalContacts: 0,
		totalViews: 0,
		totalCompletionRate: 0,
	});

	let { List } = useContext( BuildContext );
	List = JSON.parse(JSON.stringify( List ));

    const changeDate = (date, label) => {
        setDates({
            ...dates,
            [label]: date,
        });
    };

    const dateValidations = () => {
        if ( dates.startDate === null || dates.endDate === null ) {
            return {
				errorTitle: 'Select Date Range',
                errorMessage: 'Please‌ ‌select‌ ‌a‌ ‌start‌ ‌date‌ ‌and‌ ‌an‌ ‌end‌ ‌date‌ ‌to‌ ‌generate‌ ‌reports.‌',
                error: true,
            }
        }
        else if ( moment(dates.startDate).isAfter(dates.endDate) ) {
            return {
				errorTitle: 'Select Date Range',
                errorMessage: 'Start Date cannot be less than end date.',
                error: true,
            }
        }

        return {
            error: false,
        }
    }

	useEffect(() => {
		if ( ! dateValidations().error ) {
			const ajaxSecurity = document.getElementById('ajaxSecurity').value;
			const post_id = new URLSearchParams(window.location.search).get('post_id');
			const data = {
				security: ajaxSecurity,
				action: 'surveyfunnel_lite_get_reports_data',
				post_id,
				startDate: moment(dates.startDate).format('YYYY-MM-DD'),
				endDate: moment(dates.endDate).format('YYYY-MM-DD')
			};
			const ajaxURL = document.getElementById('ajaxURL').value;
			fetchData( ajaxURL, data )
			.then((data) => {
				setReports(data.data);
			});
		}
	}, [dates.startDate, dates.endDate])

	useEffect(() => {
		if ( reports.length > 0 ) {
			let totalViewed = 0;
			let totalContacts = 0;
			let totalCompletionRate = 0;
			let totalReports = reports.length;
			let totalCompleted = 0;

			for( let i = 0; i < List.CONTENT_ELEMENTS.length ; i++ ) {
				List.CONTENT_ELEMENTS[i].totalAnswered = 0;
				List.CONTENT_ELEMENTS[i].totalViewed = 0;
				for ( let j = 0 ; j < reports.length ; j++ ) {
					
					let fields = JSON.parse(reports[j].fields);
					
					if ( fields.hasOwnProperty( List.CONTENT_ELEMENTS[i].id ) ) {
						
						if ( fields[List.CONTENT_ELEMENTS[i].id].status === 'answered' ) {
							List.CONTENT_ELEMENTS[i].totalAnswered++;
							List.CONTENT_ELEMENTS[i].totalViewed++;
						}
						else {
							List.CONTENT_ELEMENTS[i].totalViewed++;
						}
						totalViewed++;

						if ( List.CONTENT_ELEMENTS[i].componentName === 'FormElements' || fields[List.CONTENT_ELEMENTS[i].id].status !== 'answered' ) {
							continue;
						}
						let { answers } = List.CONTENT_ELEMENTS[i];
						let answer = fields[List.CONTENT_ELEMENTS[i].id].answer;
						switch( List.CONTENT_ELEMENTS[i].componentName ) {
							case 'SingleChoice':
								for ( let idx = 0 ; idx < answers.length ; idx++ ) {
									if ( answers[idx].name === answer ) {
										if ( answers[idx]?.responseCount ) {
											answers[idx].responseCount++;
										}
										else {
											answers[idx].responseCount = 1;
										}
									}
								}
								break;
							case 'MultiChoice':
								for ( let idx = 0 ; idx < answers.length ; idx++ ) {
									for ( let jdx = 0 ; jdx < answer.length ; jdx++ ) {
										if ( answers[idx].name === answer[jdx].name ) {
											if ( answers[idx]?.responseCount ) {
												answers[idx].responseCount++;
											}
											else {
												answers[idx].responseCount = 1;
											}
										}
									}
								}
								break;
							default:
								break;
						}
					}
				}
			}

			for ( let j = 0 ; j < reports.length ; j++ ) {
				if ( /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(reports[j].fields) ) {
					totalContacts++;
				}
				totalCompleted += parseInt(reports[j].userMeta);
			}
			totalCompletionRate = (( totalCompleted / totalReports ) * 100).toFixed(2) + '%';
			setInsights({
				List: List,
				totalViewed,
				totalContacts,
				totalCompletionRate,
			});
			setCurrentReportSelected( reports[0] );
		}
		else {
			setInsights({
				List: {
					CONTENT_ELEMENTS: [],
				},
				totalContacts: 0,
				totalViews: 0,
				totalCompletionRate: 0,
			});
			setCurrentReportSelected(null);
		}
	}, [reports])

	const state = {
		dates,
		reports,
		currentReportSelected,
		setCurrentReportSelected,
		insights,
		setDates,
		changeDate,
		dateValidations,
		setReports
	}

	return (
		<ReportContext.Provider value={{...state}}>
			{props.children}
		</ReportContext.Provider>
	)
}

export const ReportContext = createContext();