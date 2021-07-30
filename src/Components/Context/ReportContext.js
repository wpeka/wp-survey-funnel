import React, { createContext, useEffect, useState } from 'react'
import fetchData from '../../HelperComponents/fetchData';

export function ReportContextProvider(props) {
	
	const [reports, setReports] = useState([]);
	const [currentReportSelected, setCurrentReportSelected] = useState(null);

	useEffect(() => {
		const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'wpsf_get_reports_data',
            post_id
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData( ajaxURL, data )
		.then((data) => {
			setReports(data.data);
		});
	}, [])

	useEffect(() => {
		if ( reports.length > 0 ) {
			setCurrentReportSelected( reports[0] );
		}
	}, [reports])

	const state = {
		reports,
		currentReportSelected,
		setCurrentReportSelected,
	}

	return (
		<ReportContext.Provider value={{...state}}>
			{props.children}
		</ReportContext.Provider>
	)
}

export const ReportContext = createContext();