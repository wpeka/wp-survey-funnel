import React, { useContext } from 'react'
import { DesignContext } from '../Context/DesignContext'
import DesignPreview from './DesignPreview'
import DesignSettings from './DesignSettings'

export default function Design() {
	const { saveContext } = useContext( DesignContext );
	return (
		<div id="design">
			<div className="wpsf-design-container">
				<div className="design-elements wpsf-design-setting-container">
					<DesignSettings></DesignSettings>
					<div className="wpsf-design-settings-save">
						<button onClick={saveContext}>Save</button>
					</div>
				</div>
				<div className="design-preview wpsf-design-preview-container">
					<DesignPreview></DesignPreview>
				</div>
			</div>
		</div>
	)
}
