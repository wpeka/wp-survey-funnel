import React, { useEffect, useState } from "react";
import { shortcodeTypes } from "../../Data";
import Tabs from "../../HelperComponents/Tabs";

export default function Share() {
    
	
	const [types, setTypes] = useState(shortcodeTypes);
	const [shortcode, setShortcode] = useState('');
	const [checked, setChecked] = useState('responsive');
	const [helpText, setHelpText] = useState('');
	const [ copyStatus, setCopyStatus ] = useState('Copy Shortcode');
	let shortcodeInputRef = React.createRef();

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
		setChecked(e.target.value);
	}

	const copyShortcode = () => {
		shortcodeInputRef.current.removeAttribute('disabled');
		shortcodeInputRef.current.select()
		shortcodeInputRef.current.setSelectionRange(0, 99999)
		document.execCommand("copy");
		shortcodeInputRef.current.setAttribute('disabled', true);
		setCopyStatus('Copied!');
		setTimeout(() => {
			setCopyStatus('Copy Shortcode');
		}, 4000)
	}
	
	return (
        <div className="Share">
            <div className="shareTabs">Share ShortCode</div>
            <div className="shareShortcodeSettings">
				<div className="contentShortcodeLabel">
					<label htmlFor="contentShortcode">Content ShortCode: </label>
					<button onClick={copyShortcode}>{copyStatus}</button>
				</div>
				<input type="text" id="contentShortcode" disabled ref={shortcodeInputRef} onChange={() => {}} value={shortcode} />
				<div className="contentTypes">
					Select Content Shortcode Type:
					{types.map(function(item, i) {
						return <div key={item.id}>
							<label htmlFor={item.id} className={item.id === checked ? 'contentTypeLabel active' : 'contentTypeLabel'}>{item.name}</label>
							<input type="radio" name="contentType" className="contentTypeRadio" checked={item.id === checked} onChange={handleRadioChange} value={item.id} id={item.id} />
						</div>
					})}
				</div>
				<div className="contentHelpText">
					{helpText}
				</div>
			</div>
        </div>
    );
}
