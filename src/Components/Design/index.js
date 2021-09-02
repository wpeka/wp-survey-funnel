import React, { useContext } from 'react'
import { DesignContext } from '../Context/DesignContext'
import DesignPreview from './DesignPreview'
import DesignSettings from './DesignSettings'
import '../../scss/survey.scss';


export default function Design() {
	const { saveContext } = useContext( DesignContext );
	return (
		<div id="design">
			<div className="surveyfunnel-lite-design-container">
				<div className="design-elements surveyfunnel-lite-design-setting-container">
					<DesignSettings></DesignSettings>
					<div className="surveyfunnel-lite-design-settings-save">
						<button onClick={saveContext}>Save</button>
					</div>
				</div>
				<div className="design-preview surveyfunnel-lite-design-preview-container">
					<DesignPreview></DesignPreview>
				</div>
			</div>
		</div>
	)
}
