import React, { useContext } from 'react'
import { ShareContext } from '../Context/ShareContext';
import Select from 'react-select';
import fetchData from '../../HelperComponents/fetchData';

export default function PopupSettings() {
	const { popup, handleDevicesChange, saveSettings, handleTriggerPageChange, optionsChange, options, handleLaunchOptionsChange, handleLaunchOptionsData, handleFrequencyOptionsChange, handleFrequencyDataChange } = useContext(ShareContext);
	return (
		<div className="popupSettings-container">
			<div className="targetting-options">
				<label>Show on following devices</label>
				{popup.targettingOptions.devices.map(function(item, i) {
					return <input key={i} type="checkbox" value={item.id} checked={item.checked} onChange={() => { handleDevicesChange(item.id) }} />
				})}
				<label htmlFor="triggerOnAll">Trigger on all pages</label>
				<input type="radio" id="triggerOnAll" value='triggerOnAll' checked={'triggerOnAll' === popup.targettingOptions.triggerPage} onChange={handleTriggerPageChange} />

				<label htmlFor="triggerOnSpecific">Trigger on specific pages</label>
				<input type="radio" id="triggerOnSpecific" value='triggerOnSpecific' checked={'triggerOnSpecific' === popup.targettingOptions.triggerPage} onChange={handleTriggerPageChange} />
				
				{popup.targettingOptions.triggerPage === 'triggerOnSpecific' && <Select
                    className="wpsf-async-select"
                    options={options}
					isMulti
					onChange={optionsChange}
					defaultValue={popup.targettingOptions.selectedPagesAndPosts}
                >
                </Select>}
			</div>

			<div className="behaviour-options">
				<div className="launchOptions">
					<p>Launch when: </p>
					<div>
						<input type="radio" name="launchWhen" value="afterPageLoads" checked={popup.behaviourOptions.launchOptions.launchWhen === 'afterPageLoads' } onChange={() => {handleLaunchOptionsChange('afterPageLoads')}} />
						<span>After Page Loads</span>
					</div>
					
					<div>
						<input type="radio" name="launchWhen" value="afterTimeDelay"  checked={popup.behaviourOptions.launchOptions.launchWhen === 'afterTimeDelay'} onChange={() => {handleLaunchOptionsChange('afterTimeDelay')}} />
						<span>After Time Delay of <input type="number" value={popup.behaviourOptions.launchOptions.afterTimeDelay} onChange={(e) => {handleLaunchOptionsData('afterTimeDelay', e)}} /> seconds</span>
					</div>
					
					<div>
						<input type="radio" name="launchWhen" value="afterExitIntent" checked={popup.behaviourOptions.launchOptions.launchWhen === 'afterExitIntent'} onChange={() => {handleLaunchOptionsChange('afterExitIntent')}} />
						<span>
							<label>Select Sensitivity</label>
							<input type="radio" name="sensitivity" checked={popup.behaviourOptions.launchOptions.afterExitIntent === 'low'} value="low" onChange={(e) => {handleLaunchOptionsData('afterExitIntent', e)}} />
							<label>low</label>
							<input type="radio" name="sensitivity" checked={popup.behaviourOptions.launchOptions.afterExitIntent === 'medium'} value="medium" onChange={(e) => {handleLaunchOptionsData('afterExitIntent', e)}} />
							<label>medium</label>
							<input type="radio" name="sensitivity" checked={popup.behaviourOptions.launchOptions.afterExitIntent === 'high'} value="high" onChange={(e) => {handleLaunchOptionsData('afterExitIntent', e)}} />
							<label>high</label>
						</span>
					</div>

					<div>
						<input type="radio" name="launchWhen" value="afterScrollPercentage" checked={popup.behaviourOptions.launchOptions.launchWhen === 'afterScrollPercentage'} onChange={() => {handleLaunchOptionsChange('afterScrollPercentage')}}/>
						<label>After Scroll Percentage</label>
						<input type="range" name="scrollPercentage" min="0" max="100" value={popup.behaviourOptions.launchOptions.afterScrollPercentage} onChange={(e) => {handleLaunchOptionsData('afterScrollPercentage', e)}} />
					</div>
				</div>
				<div className="frequency">
					<p>Frequency: </p>
					<div>
						<input type="radio" name="frequency" value="alwaysShow" checked={popup.behaviourOptions.frequencyOptions.frequency === 'alwaysShow'} onChange={() => {handleFrequencyOptionsChange('alwaysShow')}} />
						<span>Always Show</span>
					</div>

					<div>
						<input type="radio" name="frequency" value="hideFor" checked={popup.behaviourOptions.frequencyOptions.frequency === 'hideFor'} onChange={() => {handleFrequencyOptionsChange('hideFor')}} />
						<span>Hide For <input type="number" value={popup.behaviourOptions.frequencyOptions.hideFor} onChange={(e) => {handleFrequencyDataChange('hideFor', e.target.value)}} />days after closing</span>
					</div>

					<div>
						if the visitor has completed the survey dont show it again:
						<input type="checkbox" checked={popup.behaviourOptions.frequencyOptions.dontShowAgain} value={popup.behaviourOptions.frequencyOptions.dontShowAgain} name="dontShowAgain" onChange={(e) => {handleFrequencyDataChange('dontShowAgain', e.target.checked)}} />
					</div>
				</div>
			</div>
			<button type="button" onClick={saveSettings}>save</button>
		</div>
	)
}
