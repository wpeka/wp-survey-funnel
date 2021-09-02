import React, { useContext, useState } from 'react'
import { ReportContext } from '../Context/ReportContext';
import NoResponseRecorded from './NoResponseRecorded';

const getAnswerBlocks = ( item ) => {
	switch( item.componentName ) {
		case 'SingleChoice':
		case 'MultiChoice':
			return <>
				{item.answers.map(function(ele, i) {
					let percentageAnswered = 0.00;
					if ( ele?.responseCount ) {
						percentageAnswered = (ele.responseCount / item.totalAnswered) * 100;
					}
					return <div key={i} className="insightAnswerBlock">
						<div className="surveyfunnel-lite-insight-answer-box">
							{ele.name}
						</div>
						<p><span>{percentageAnswered.toFixed(2) + '%'}</span>{ele?.responseCount ? ele.responseCount : 0 } Responses.</p>
					</div>
				})}
			</>
		case 'FormElements':
			return <>
				{item.List.map(function(ele, i) {
					return <div key={i} className="insightAnswerBlock">
						<div className="surveyfunnel-lite-insight-answer-box">
							{ele.name}
						</div>
					</div>
				})}
			</>
	}
}

export default function Insights() {

	const { insights } = useContext( ReportContext );
	
	return (
		<div>
			{ insights.List.CONTENT_ELEMENTS.length > 0 ? (<><div className="insightsOverview">
				<div className="insightBox">
					<p className="insightBoxViews">{insights.totalViewed}</p>
					<small>Views</small>
				</div>
				<div className="insightBox">
					<p className="insightBoxContacts">{insights.totalContacts}</p>
					<small>Contacts</small>
				</div>
				<div className="insightBox">
					<p className="insightBoxCompl">{insights.totalCompletionRate}</p>
					<small>Completion Rate.</small>
				</div>
			</div>
			<div className="insights-container">
				<div className="surveyfunnel-lite-insight-summary-heading">
					<h3>Insight Summary</h3>
				</div>
				{insights.List.CONTENT_ELEMENTS.map(function( item, i ) {
					return (
                        <div key={item.id} className="insights-summary-single">
                            <h4>{item.title}</h4>
                            <div className="insights-data">
                                <p>
									{item.totalAnswered}
                                    {item.componentName === "FormElements" ? (
                                        <span> Submissions </span>
                                    ) : (
                                        <span> Answered </span>
                                    )}
                                    | {item.totalViewed} Viewed.
                                </p>
                            </div>
                            <p>Answers : </p>
                            <div className="insights-answers">
                                {getAnswerBlocks(item)}
                            </div>
                        </div>
                    );
				})}
			</div></>) : (<NoResponseRecorded title={'No Responses Received'} description={'No responses/insights received for provided start date and end date!'} />)}
		</div>
	)
}
