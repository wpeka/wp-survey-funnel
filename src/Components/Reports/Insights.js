import React, { useContext, useState } from 'react'
import { ReportContext } from '../Context/ReportContext';
import { BuildContext } from '../Context/BuildContext';

const getAnswerBlocks = ( item, data ) => {
	switch( item.componentName ) {
		case 'SingleChoice':
		case 'MultiChoice':
			return <>
				{data.responses.map(function(ele, i) {
					return <div key={i} className="insightAnswerBlock">
						{ele.name}
						<p>{ele.totalResponses} Responses.</p>
					</div>
				})}
			</>
		case 'FormElements':
			return <>
				{item.List.map(function(ele, i) {
					return <div key={i} className="insightAnswerBlock">
						{ele.name}
					</div>
				})}
			</>
	}
}

export default function Insights() {
	const [views, setViews] = useState(0);
	const [contacts, setContacts] = useState(0);
	const [completionRate, setCompletionRate] = useState(0);

	const { reports } = useContext( ReportContext );
	const { List } = useContext( BuildContext );

	const calculateInsightData = ( item ) => {
		let data = {
			totalAnswered: 0,
			totalViewed: 0,
			responses: [],
		}

		if ( item.componentName !== 'FormElements' ) {
			data.responses = item.answers;
			for( let i = 0 ; i < data.responses.length ; i++ ) {
				data.responses[i].totalResponses = 0;
			}
		}
	
		for ( let i = 0; i < reports.length ; i++ ) {
			let fields = JSON.parse(reports[i].fields);
			if ( fields.hasOwnProperty( item.id ) ) {
				let { status, answer } = fields[item.id];
				status === 'answered' ? (data.totalAnswered++, data.totalViewed++) : data.totalViewed++;
				if ( status === 'answered' ) {
					switch( item.componentName ) {
						case 'FormElements':
							break;
						case 'SingleChoice':
							for(let idx = 0; idx < data.responses.length ; idx++) {
								
								if ( answer === data.responses[idx].name ) {
									data.responses[idx].totalResponses++;
								}
							}
							break;
						case 'MultiChoice':
							for(let idx = 0; idx < data.responses.length ; idx++) {
								
								for( let j = 0 ; j < answer.length ; j++) {
									if ( data.responses[idx].name === answer[j].name ) {
										data.responses[idx].totalResponses++;
									}
								}
							}
							break;
					}
				}
			}
		}
		return data;
	}
	
	return (
		<div>
			<div className="insightsOverview">
				<div className="insightBox">
					<p className="insightBoxViews">{views}</p>
					<small>Views</small>
				</div>
				<div className="insightBox">
					<p className="insightBoxContacts">{contacts}</p>
					<small>Contacts</small>
				</div>
				<div className="insightBox">
					<p className="insightBoxCompl">{completionRate}</p>
					<small>Completion Rate.</small>
				</div>
			</div>
			<div className="insights-container">
				{List.CONTENT_ELEMENTS.map(function( item, i ) {
					// calculate answered and viewed.
					let data = calculateInsightData( item );
					return (
                        <div key={item.id} className="insights-summary-single">
                            <h4>{item.title}</h4>
                            <div className="insights-data">
                                <p>
									{data.totalAnswered}
                                    {item.componentName === "FormElements" ? (
                                        <span>Submissions</span>
                                    ) : (
                                        <span>Answered</span>
                                    )}
                                    | {data.totalViewed} Viewed.
                                </p>
                            </div>
                            <p>Answers : </p>
                            <div className="insights-answers">
                                {getAnswerBlocks(item, data)}
                            </div>
                        </div>
                    );
				})}
			</div>
		</div>
	)
}
