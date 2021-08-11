import React, { useContext } from 'react'
import { ShareContext } from '../Context/ShareContext';

export default function PopupSettings() {
	const { popup, handleDevicesChange, saveSettings, handleTriggerPageChange } = useContext(ShareContext);

	return (
		<div className="popupSettings-container">
			<div className="targetting-options">
				<label>Show on following devices</label>
				{popup.targettingOptions.devices.map(function(item, i) {
					return <input key={i} type="checkbox" value={item.id} checked={item.checked} onChange={() => { handleDevicesChange(item.id) }} />
				})}
				<label htmlFor="triggerOnAll">Trigger on all pages</label>
				<input type="radio" id="triggerOnAll" value='triggerOnAll' checked={'triggerOnAll' === popup.triggerPage} onChange={handleTriggerPageChange} />

				<label htmlFor="triggerOnSpecific">Trigger on specific pages</label>
				<input type="radio" id="triggerOnSpecific" value='triggerOnSpecific' checked={'triggerOnSpecific' === popup.triggerPage} onChange={handleTriggerPageChange} />
			</div>
			<button type="button" onClick={saveSettings}>save</button>
		</div>
	)
}
