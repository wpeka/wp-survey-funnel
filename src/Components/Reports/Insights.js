import React, { useContext, useState } from 'react'
import { ReportContext } from '../Context/ReportContext';

const getAnswerBlocks = ( item ) => {
	switch( item.componentName ) {
		case 'SingleChoice':
		case 'MultiChoice':
			return <>
				{item.answers.map(function(ele, i) {
					return <div key={i} className="insightAnswerBlock">
						{ele.name}
						<p>{ele.responseCount} Responses.</p>
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

	const { insights } = useContext( ReportContext );
	
	return (
		<div>
			<div className="insightsOverview">
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
				{insights.List.CONTENT_ELEMENTS.map(function( item, i ) {
					return (
                        <div key={item.id} className="insights-summary-single">
                            <h4>{item.title}</h4>
                            <div className="insights-data">
                                <p>
									{item.totalAnswered}
                                    {item.componentName === "FormElements" ? (
                                        <span>Submissions</span>
                                    ) : (
                                        <span>Answered</span>
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
			</div>
		</div>
	)
}
