import React, { useContext } from 'react'
import { ShareContext } from '../Context/ShareContext';
import Select from 'react-select';
import fetchData from '../../HelperComponents/fetchData';

export default function PopupSettings() {
	const { popup, handleDevicesChange, saveSettings, handleTriggerPageChange, optionsChange, options, handleLaunchOptionsChange, handleLaunchOptionsData, handleFrequencyOptionsChange, handleFrequencyDataChange, handlePopupActivation } = useContext(ShareContext);
	const handleCollapseTarget =function(e){
		var collapseElement = document.getElementById('surveyfunnel-lite_targetting_options');
		if ( collapseElement.style.display == 'none' ) {
			collapseElement.style.display = 'block';
		}
		else {
			collapseElement.style.display = 'none';
		}
	}
	const handleCollapseActivate =function(e){
		var collapseElement = document.getElementById('surveyfunnel-lite_activate_popup_container');
		if ( collapseElement.style.display == 'none' ) {
			collapseElement.style.display = 'block';
		}
		else {
			collapseElement.style.display = 'none';
		}
	}
	const handleCollapseBehaviour =function(e){
		var collapseElement = document.getElementById('surveyfunnel-lite_behaviour');
		if ( collapseElement.style.display == 'none' ) {
			collapseElement.style.display = 'block';
			var range = document.getElementById('surveyfunnel-lite_scroll_range');
			if (range) {
				const bubble = document.querySelector(".surveyfunnel-lite-bubble");
				const val = range.value;
				const min = range.min ? range.min : 0;
				const max = range.max ? range.max : 100;
				const newVal = Number(((val - min) * 100) / (max - min));
				bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
				bubble.innerHTML = val+'%';
			}
		}
		else {
			collapseElement.style.display = 'none';
		}
	}
	const customStyles = {
		control: styles => ({ 
			...styles, 
			backgroundColor: '#ffffff',
			padding:'10px',
			borderRadius:'9px'
		}),
	}
	return (
		<div className="popupSettings-container">
			<div className="popupSettings">
				<button className="surveyfunnel-lite-share-collapsible surveyfunnel-lite-target-btn" onClick={(e)=>{handleCollapseTarget(e)}}><h3>Targetting Options</h3></button>
				<div id="surveyfunnel-lite_targetting_options" className="targetting-options"  style={{display:'none'}}>
					<label>Show on following devices</label>
					<div className="surveyfunnel-lite-show-device-container">
						{popup.targettingOptions.devices.map(function(item, i) {
							return 	<div key={i + 'device-container'} className="surveyfunnel-lite-device-box" >
										<div className="surveyfunnel-lite-show-device">
											<input key={i} id={item.id} type="checkbox" value={item.id} checked={item.checked} onChange={() => { handleDevicesChange(item.id) }} />
											<label htmlFor={item.id}>
												<span>
													<img src={require(`../Build/BuildImages/checkmark.png`)} alt="Checked Icon" />
												</span>
											</label>
										</div>
										<div className="surveyfunnel-lite-device-icon" >
											<img src={require(`../Build/BuildImages/${item.id}.png`)} alt="device image"/>
										</div>
									</div>
						})}
					</div>
					
					<div className="surveyfunnel-lite-show-on-pages">
						<label>Show on following pages</label>
						<div className="surveyfunnel-lite-show-on-pages-item">
							<input type="radio" id="triggerOnAll" value='triggerOnAll' checked={'triggerOnAll' === popup.targettingOptions.triggerPage} onChange={handleTriggerPageChange} />
							<label htmlFor="triggerOnAll">Trigger on all pages</label>
						</div>
						<div className="surveyfunnel-lite-show-on-pages-item">
							<input type="radio" id="triggerOnSpecific" value='triggerOnSpecific' checked={'triggerOnSpecific' === popup.targettingOptions.triggerPage} onChange={handleTriggerPageChange} />
							<label htmlFor="triggerOnSpecific">Trigger on specific pages</label>
						</div>					
						
						{popup.targettingOptions.triggerPage === 'triggerOnSpecific' && <Select
							className="surveyfunnel-lite-async-select"
							options={options}
							isMulti
							onChange={optionsChange}
							defaultValue={popup.targettingOptions.selectedPagesAndPosts}
							styles={customStyles}
						>
						</Select>}


					</div>

				</div>

				<button  className="surveyfunnel-lite-share-collapsible surveyfunnel-lite-behaviour-btn" onClick={(e)=>{handleCollapseBehaviour(e)}}><h3>Behaviour</h3></button>
				<div id="surveyfunnel-lite_behaviour" className="behaviour-options"  style={{display:'none'}}>
					<div className="launchOptions">
						<p>Launch when: </p>
						<div className="launchOptions-field">
							<input id="afterPageLoads" type="radio" name="launchWhen" value="afterPageLoads" checked={popup.behaviourOptions.launchOptions.launchWhen === 'afterPageLoads' } onChange={() => {handleLaunchOptionsChange('afterPageLoads')}} />
							<label htmlFor="afterPageLoads">After page loads</label>
						</div>
						
						<div className="launchOptions-field">
							<input id="afterTimeDelay" type="radio" name="launchWhen" value="afterTimeDelay"  checked={popup.behaviourOptions.launchOptions.launchWhen === 'afterTimeDelay'} onChange={() => {handleLaunchOptionsChange('afterTimeDelay')}} />
							<label htmlFor="afterTimeDelay" >After time delay of <input type="number" value={popup.behaviourOptions.launchOptions.afterTimeDelay} onChange={(e) => {handleLaunchOptionsData('afterTimeDelay', e)}} /> seconds</label>
						</div>
						
						<div className="launchOptions-field sensitivity-container">
							<input id="afterExitIntent"  type="radio" name="launchWhen" value="afterExitIntent" checked={popup.behaviourOptions.launchOptions.launchWhen === 'afterExitIntent'} onChange={() => {handleLaunchOptionsChange('afterExitIntent')}} />
							<label htmlFor="afterExitIntent" >
								Select‌ ‌exit-intent‌ ‌sensitivity‌
								<div className="launchOptions-field-sensitivity">
									<input id="surveyfunnel-lite_low"type="radio" name="sensitivity" checked={popup.behaviourOptions.launchOptions.afterExitIntent === 'low'} value="low" onChange={(e) => {handleLaunchOptionsData('afterExitIntent', e)}} />
									<label htmlFor="surveyfunnel-lite_low" >Low</label>
									<input id="surveyfunnel-lite_medium" type="radio" name="sensitivity" checked={popup.behaviourOptions.launchOptions.afterExitIntent === 'medium'} value="medium" onChange={(e) => {handleLaunchOptionsData('afterExitIntent', e)}} />
									<label htmlFor="surveyfunnel-lite_medium" >Medium</label>
									<input id="surveyfunnel-lite_high" type="radio" name="sensitivity" checked={popup.behaviourOptions.launchOptions.afterExitIntent === 'high'} value="high" onChange={(e) => {handleLaunchOptionsData('afterExitIntent', e)}} />
									<label htmlFor="surveyfunnel-lite_high" >High</label>
								</div>

							</label>
						</div>

						<div className="launchOptions-field">
							<input id="afterScrollPercentage" type="radio" name="launchWhen" value="afterScrollPercentage" checked={popup.behaviourOptions.launchOptions.launchWhen === 'afterScrollPercentage'} onChange={() => {handleLaunchOptionsChange('afterScrollPercentage')}}/>
							<label htmlFor="afterScrollPercentage" >After scroll percentage</label>
						</div>
						<div className="launchOptions-field-range">
							<input id="surveyfunnel-lite_scroll_range" type="range" name="scrollPercentage" min="0" max="100" value={popup.behaviourOptions.launchOptions.afterScrollPercentage} onChange={(e) => {handleLaunchOptionsData('afterScrollPercentage', e)}} />
							<output className="surveyfunnel-lite-bubble"></output>
						</div>

					</div>
					<div className="frequency">
						<p>Frequency: </p>
						<div className="launchOptions-field">
							<input id="surveyfunnel-lite_always_show" type="radio" name="frequency" value="alwaysShow" checked={popup.behaviourOptions.frequencyOptions.frequency === 'alwaysShow'} onChange={() => {handleFrequencyOptionsChange('alwaysShow')}} />
							<label htmlFor="surveyfunnel-lite_always_show" >Always show</label>
						</div>

						<div className="launchOptions-field">
							<input id="surveyfunnel-lite_hide_for" type="radio" name="frequency" value="hideFor" checked={popup.behaviourOptions.frequencyOptions.frequency === 'hideFor'} onChange={() => {handleFrequencyOptionsChange('hideFor')}} />
							<label htmlFor="surveyfunnel-lite_hide_for" >Hide for <input type="number" value={popup.behaviourOptions.frequencyOptions.hideFor} onChange={(e) => {handleFrequencyDataChange('hideFor', e.target.value)}} /> days after closing</label>
						</div>

						<div className="surveyfunnel-lite-freq-show-again">
							<p>If the visitor has completed the survey don't show it again:</p>
							<input id="surveyfunnel-lite_show_survey_again" type="checkbox" checked={popup.behaviourOptions.frequencyOptions.dontShowAgain} value={popup.behaviourOptions.frequencyOptions.dontShowAgain} name="dontShowAgain" onChange={(e) => {handleFrequencyDataChange('dontShowAgain', e.target.checked)}} />
							<label htmlFor="surveyfunnel-lite_show_survey_again" > </label>

						</div>

					</div>
				</div>
				<button  className="surveyfunnel-lite-share-collapsible surveyfunnel-lite-activate-btn" onClick={(e)=>{handleCollapseActivate(e)}}><h3>Activate</h3></button>
				<div id="surveyfunnel-lite_activate_popup_container" className="activate-popup-options"  style={{display:'none'}}>
						<div className="reviewAndActivateOptions">
							<p>Activate Popup: </p>
							<input id="surveyfunnel-lite_activate_popup" type="checkbox" value={popup.active} checked={popup.active} onChange={() => {handlePopupActivation()}} />
							<label htmlFor="surveyfunnel-lite_activate_popup"> </label>
					</div>
				</div>
			</div>

			<div className="share-info-save-container">
				<button type="button" onClick={saveSettings}>Save</button>
			</div>
		</div>
	)
}
