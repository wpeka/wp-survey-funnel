import React, { useEffect, useState } from "react";
import { shortcodeTypes } from "../../Data";
import Tabs from "../../HelperComponents/Tabs";
import '../../scss/share.scss';


export default function Share() {
    
	
	const [types, setTypes] = useState(shortcodeTypes);
	const [shortcode, setShortcode] = useState('');
	const [checked, setChecked] = useState('responsive');
	const [helpText, setHelpText] = useState('');
	useEffect(() => {
		setShortcode('[wpsf_survey id="'+ new URLSearchParams(window.location.search).get('post_id') +'" type="'+ checked +'"]');
		for(let i = 0 ; i < shortcodeTypes.length; i++) {
			if ( checked === shortcodeTypes[i].id ) {
				setHelpText(shortcodeTypes[i].helpText);
				return;
			}
		}
	}, [checked])
	const handleRadioChange = (e) => {
		var clickedLabel = document.querySelectorAll('.contentTypeLabel');
		clickedLabel.forEach(function(label){
			label.parentNode.classList.remove('contentType-element-active');
		});
		e.currentTarget.parentNode.classList.add('contentType-element-active');
		setChecked(e.target.value);
	}
	
	return (
        <div className="Share">
            <div className="shareTabs">
				<div className="shareTabs-element">
					<h3>Share ShortCode</h3>
					<img src={require('../Build/BuildImages/arrowRight.png')}></img>
				</div>
			</div>
            <div className="shareShortcodeSettings">
				<div className="contentShortcodeLabel-container">
					<div className="contentShortcodeLabel">
						<h3>Content ShortCode: </h3>
						<button>Copy Shortcode</button>
					</div>
					<input type="text" id="contentShortcode" disabled value={shortcode} />
				</div>

				<div className="contentTypes">
					<div className="contentTypesLabel">
						<h3>
							Select Content Shortcode Type:
						</h3>
					</div>
					<div className="contentTypes-container">
						{types.map(function(item, i) {
							
							return <div key={item.id} className={item.id === checked ? 'contentType-element contentType-element-active' : 'contentType-element'}>
								<label htmlFor={item.id} className={item.id === checked ? 'contentTypeLabel active' : 'contentTypeLabel'}>{item.name}</label>
								<input type="radio" name="contentType" className="contentTypeRadio" checked={item.id === checked} onChange={handleRadioChange} value={item.id} id={item.id} disabled={item.id === 'reponsive' ? '' : 'disabled'} />
							</div>
						})}
					</div>

				</div>
				<div className="contentHelpText">
					{helpText}
				</div>
			</div>
        </div>
    );
}
