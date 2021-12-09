import React from 'react'
// component when there is no response or date has not been selected.
export default function NoResponseRecorded( {title, description} ) {
	return (
		<div className="NRR">
			<div className="NRR-container">
				<div className="NRR-headline">
					<p style={{fontSize: '36px'}}>{title}</p>
					<label style={{fontSize: '16px', color: '#9DA9B4'}}>{description}</label>
				</div>
				<div className="NRR-image">
					<img src={require( './ReportImages/nodata.png' )} alt="No Data found" />
				</div>
			</div>
		</div>
	)
}
