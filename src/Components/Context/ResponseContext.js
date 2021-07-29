import React, { createContext, useEffect, useState } from 'react'
import fetchData from '../../HelperComponents/fetchData';

export function ResponseContextProvider(props) {
	
	const [responses, setResponses] = useState([]);
	const [currentResponseSelected, setCurrentResponseSelected] = useState(null);

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
			console.log(data);
		});
	}, [])

	const state = {
		responses,
		currentResponseSelected,
		setCurrentResponseSelected,
	}

	return (
		<ResponseContext.Provider value={{...state}}>
			{props.children}
		</ResponseContext.Provider>
	)
}

export const ResponseContext = createContext();