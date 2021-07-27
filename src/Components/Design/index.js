import React, { useContext } from 'react'
import { DesignContext } from '../Context/DesignContext'
import DesignPreview from './DesignPreview'
import DesignSettings from './DesignSettings'

export default function Design() {
	const { saveContext } = useContext( DesignContext );
	return (
		<div id="design">
			<div className="design-container">
				<div className="design-elements">
					<DesignSettings></DesignSettings>
				</div>
				<div className="design-preview">
					<DesignPreview></DesignPreview>
				</div>
			</div>
			<button onClick={saveContext}>saveData</button>
		</div>
	)
}
