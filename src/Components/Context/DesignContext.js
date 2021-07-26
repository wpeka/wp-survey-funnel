import React, { createContext, useState } from 'react';

const initState = {
	fontColor: '#000',
	backgroundColor: '#fff'
}

export function DesignContextProvider(props) {
	
	const [initialState, setinitialState] = useState(initState);
	
	return (
		<DesignContext.Provider
			value={{...initialState}}
		>
			{props.children}
			
		</DesignContext.Provider>
	);
}

export const DesignContext = createContext();