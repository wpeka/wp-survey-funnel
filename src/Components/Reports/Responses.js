import React, { useContext, useEffect } from 'react'
import { BuildContext } from '../Context/BuildContext';
import { ReportContext } from '../Context/ReportContext'
import NoResponseRecorded from './NoResponseRecorded';
import moment from 'moment';

export default function Responses() {
	const { reports, currentReportSelected, setCurrentReportSelected, setReports } = useContext( ReportContext );
	const { List, title } = useContext( BuildContext );

	const getCurrentReportSelectedPreview = () => {
		if ( currentReportSelected === null ) {
			return;
		}
		let { fields } = currentReportSelected;
		fields = JSON.parse(fields);
		const arrayOfObj = Object.values(fields);
		console.log(arrayOfObj);
		if ( arrayOfObj.length === 1 ) {
			if ( arrayOfObj[0].status === 'viewed' ) {
				return (<div className="surveyfunnel-lite-preview-container" style={{textAlign: 'center'}}>
					<span className="surveyfunnel-lite-no-response">The user did not submit any responses.</span>
				</div>)
			}
		}
		return (<div className="surveyfunnel-lite-preview-container">
			{arrayOfObj.map(function(item, i) {
				if ( item.status === 'answered' ) {
					return (<div key={item._id} className="surveyfunnel-lite-report-question-container">
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
	const exportCSV = () => {
		let csvString = [
			[...getCSVFirstRow()],
		];
		if ( ! reports.length > 0 ) {
			return;
		}
		let array = [];
		for ( let i = 0 ; i < reports.length; i++ ) {
			if ( ! reports[i].checked ) {
				continue;
			}
			let data = [
				title,
				moment.unix(reports[i].time_created).format( 'YYYY-MM-DD HH:mm A' ),
				reports[i].user_meta === 0 ? 'No' : 'Yes'
			]
			let fields = JSON.parse(reports[i].fields);
			for ( let j = 0 ; j < List.CONTENT_ELEMENTS.length ; j++ ) {
				if ( fields.hasOwnProperty( List.CONTENT_ELEMENTS[j].id ) ) {
					if ( fields[List.CONTENT_ELEMENTS[j].id].status === 'answered' ) {
						if ( Array.isArray( fields[List.CONTENT_ELEMENTS[j].id].answer ) && fields[List.CONTENT_ELEMENTS[j].id].componentName !== 'FormElements' ) {
							let answerString = '';
							for( let k = 0; k < fields[List.CONTENT_ELEMENTS[j].id].answer.length; k++ ) {
								answerString += fields[List.CONTENT_ELEMENTS[j].id].answer[k].name + ' ';
							}
							data.push( answerString );
						}
						else if ( Array.isArray( fields[List.CONTENT_ELEMENTS[j].id].answer ) && fields[List.CONTENT_ELEMENTS[j].id].componentName === 'FormElements' ) {
							for( let k = 0; k < fields[List.CONTENT_ELEMENTS[j].id].answer.length; k++ ) {
								data.push( fields[List.CONTENT_ELEMENTS[j].id].answer[k].value);
							}
						}
						else {
							data.push( fields[List.CONTENT_ELEMENTS[j].id].answer );
						}
					}
					else {
						if ( fields[List.CONTENT_ELEMENTS[j].id].componentName === 'FormElements' ) {
							for( let k = 0; k < List.CONTENT_ELEMENTS[j].List.length; k++ ) {
								data.push( '' );
							}
						}
						else {
							data.push( '' );
						}
					}
				}
				else {
					if ( List.CONTENT_ELEMENTS[j].componentName === 'FormElements' ) {
						for( let k = 0; k < List.CONTENT_ELEMENTS[j].List.length; k++ ) {
							data.push( '' );
						}
					}
					else {
						data.push( '' );
					}
				}
			}
			array.push(data);
		}

		csvString = [...csvString, ...array].map(e => e.join(",")) .join("\n");
		document.getElementById('csv_data').value = csvString;
		document.getElementById('post_csv').submit();
	}

	function getCSVFirstRow() {
		let returnValue = [
			'Content Name',
			'Date Created',
			'Content Completed'
		];
		const { CONTENT_ELEMENTS } = List;
		for ( let i = 0 ; i < CONTENT_ELEMENTS.length; i++ ) {
			if ( CONTENT_ELEMENTS[i].componentName === 'FormElements' ) {
				let { List } =  CONTENT_ELEMENTS[i];
				for( let j = 0 ; j < List.length ; j++ ) {
					returnValue.push( List[j].name );
				}
			}
			else {
				returnValue.push( CONTENT_ELEMENTS[i].title );
			}
		}

		return returnValue;
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
	
	const handleCheckboxChange = ( idx ) => {
		const newList = JSON.parse( JSON.stringify( reports ) );
		newList[idx].checked = !newList[idx].checked;
		setReports(newList);
	}

	if ( reports.length <= 0 ) {
		return (
			<NoResponseRecorded title={'No Responses Received'} description={'No responses/insights received for provided start date and end date!'} />
		)
	}
	return (
		<div className="responseDataViewer">
			<div className="responseSelector">
				<p>Total Responses: {reports.length}</p>
				<div className="selectionElementsContainer">
					<div className="selectionElements">
						{reports.map(function(item, i) {
							let className = 'selectElement ';
							if ( currentReportSelected !== null && currentReportSelected.userLocaleID === item.userLocaleID ) {
								className += 'selected';
							}
							return <div className="selectionElement" key={item.userLocaleID}>
								<div className={className} onClick={() => {handleReportChange(i)}} click-idx={i}>
									<input type="checkbox" value={item.checked} onChange={() => {handleCheckboxChange(i)}} />
									<div className="selectElement-title">
										<h3>{item.lead}</h3>
										<small>{moment.unix(item.time_created).format( 'YYYY-MM-DD HH:mm A' )}</small>
									</div>
								</div>
							</div>
						})}
					</div>
					<div className="surveyfunnel-lite-export-csv-btn">
						<button onClick={exportCSV}>Export CSV</button>
					</div>
				</div>


			</div>
			<div className="responsePreview">
				{reports.length > 0 && currentReportSelected !== null ? (<p>Response preview for: {currentReportSelected.lead} <img src={require('../Build/BuildImages/calendar.png')}></img> {moment.unix(currentReportSelected.time_created).format( 'YYYY-MM-DD' )} <img src={require('../Build/BuildImages/clock.png')}></img> {moment.unix(currentReportSelected.time_created).format( ' HH:mm A' )}</p>) : (<p>No response recorded</p>)}
				{getCurrentReportSelectedPreview()}
			</div>
			<form method="post" id="post_csv" action={document.getElementById('exportCSVAction').value}>
				<input type="hidden" name="csv_data" id="csv_data" value="" />
				<input type="hidden" name="security" value={document.getElementById('ajaxSecurity')}  />
			</form>
		</div>
	)
}
