import React, { useContext, useEffect } from 'react'
import { ReportContext } from '../Context/ReportContext'

export default function Responses() {
	const { reports, currentReportSelected, setCurrentReportSelected } = useContext( ReportContext );

	const getCurrentReportSelectedPreview = () => {
		if ( currentReportSelected === null ) {
			return;
		}
		let { fields } = currentReportSelected;
		fields = JSON.parse(fields);
		const arrayOfObj = Object.values(fields);
		return (<div>
			{arrayOfObj.map(function(item, i) {
				if ( item.status === 'answered' ) {
					return (<div key={item._id}>
						<div className="currentReportQuestion">
							<h2>{item.tabNumber}. {item.question}</h2>
						</div>
						<div className="currentReportAnswer">
							{getCurrentReportAnswer(item)}
						</div>
					</div>);
				}
			})}
		</div>);
	}

	const getCurrentReportAnswer = ( report ) => {
		switch ( report.componentName ) {
			case 'SingleChoice':
				return <div className="currentAnswer">
					{report.answer}
				</div>

			case 'MultiChoice':
				return <>
					{report.answer.map(function(item, i) {
						return <div key={i} className="currentAnswer">
							{item.name}
						</div>
					})}
				</>

			case 'FormElements':
				return <>
					{report.answer.map(function(item, i) {
						return <div key={i} className="currentAnswer">
							<span className="formElementLabel">{item.name}</span>: {item.value}
						</div>
					})}
				</>
		}
	}

	const handleReportChange = ( idx ) => {
		setCurrentReportSelected(reports[idx]);
	}

	return (
		<div className="responseDataViewer">
			<div className="responseSelector">
				{reports.length > 0 ? (<p>Total Responses. {reports.length}</p>) : (<p>No response recorded</p>)} 
				<div className="selectionElements">
					{reports.map(function(item, i) {
						return <div className="selectionElement" key={item.userLocaleID}>
							<input type="checkbox" />
							<div className="selectElement" onClick={() => {handleReportChange(i)}} click-idx={i}>
								<h3>{item.lead}</h3>
								<small>{item.time_created}</small>
							</div>
						</div>
					})}
				</div>
			</div>
			<div className="responsePreview">
				Response Preview For: {reports.length > 0 ? (<p>Response preview for: {currentReportSelected.lead} {currentReportSelected.time_created}</p>) : (<p>No response recorded</p>)}
				{getCurrentReportSelectedPreview()}
			</div>
		</div>
	)
}
