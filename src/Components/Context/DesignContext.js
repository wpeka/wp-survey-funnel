import React, { createContext, useState, useEffect } from 'react';
import { initColorState } from '../../Data';
import fetchData from '../../HelperComponents/fetchData';

export function DesignContextProvider(props) {
	
	const [initialState, setinitialState] = useState(initColorState);

	const handleColorChange = (itemName, color) => {
		setinitialState({
			...initialState,
			[itemName]: color
		});
	}

	useEffect(() => {
		const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'wpsf_get_design_data',
            post_id,
        };
        const ajaxURL = document.getElementById('ajaxURL').value;

		fetchData( ajaxURL, data )
		.then(data => {
			if ( data.data === '' ) {
				return;
			}
			const design = JSON.parse( data.data.design );
			setinitialState(design);
        });
	}, []);

	const saveContext = () => {
		const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'wpsf_save_design_data',
            post_id,
			state: JSON.stringify( { ...initialState } ),
        };
        const ajaxURL = document.getElementById('ajaxURL').value;

		fetchData( ajaxURL, data )
		.then(data => {
			console.log(data);
        });
	}

	return (
		<DesignContext.Provider
			value={{...initialState, handleColorChange}}
		>
			{props.children}
			<button onClick={saveContext}>saveData</button>
		</DesignContext.Provider>
	);
}

export const DesignContext = createContext();