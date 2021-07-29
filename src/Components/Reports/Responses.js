import React, { useContext, useEffect } from 'react'
import { ResponseContext } from '../Context/ResponseContext'

export default function Responses() {
	const responses = useContext( ResponseContext );	
	return (
		<div>
			{responses.map(function( item, i ) {
				console.log(item);
			})}
		</div>
	)
}
