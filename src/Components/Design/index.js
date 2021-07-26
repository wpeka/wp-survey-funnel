import React from 'react'
import DesignPreview from './DesignPreview'
import DesignSettings from './DesignSettings'

export default function Design() {
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
		</div>
	)
}
