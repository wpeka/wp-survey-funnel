import React, { useContext, useState, useEffect } from "react";
import { ShareContext } from "../Context/ShareContext";
import { shortcodeTypes } from "../../Data";

export default function ShareShortCode() {
	const [ copyStatus, setCopyStatus ] = useState('Copy Shortcode');
	let shortcodeInputRef = React.createRef();

	const [types, setTypes] = useState(shortcodeTypes);
	const [shortcode, setShortcode] = useState('');
	const [checked, setChecked] = useState('responsive');
	const [helpText, setHelpText] = useState('');
	

	useEffect(() => {
		setShortcode('[surveyfunnel_lite_survey id="'+ new URLSearchParams(window.location.search).get('post_id') +'" type="'+ checked +'"]');
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
        <div className="shareShortcodeSettings">
            <div className="contentShortcodeLabel-container">
                <div className="contentShortcodeLabel">
                    <h3>ShortCode: </h3>
                    <button onClick={copyShortcode}>{copyStatus}</button>
                </div>
                <input
                    type="text"
                    id="contentShortcode"
                    disabled
                    ref={shortcodeInputRef}
                    onChange={() => {}}
                    value={shortcode}
                />
            </div>

            <div className="contentTypes">
                <div className="contentTypesLabel">
                    <h3>Select Shortcode Type:</h3>
                </div>
                <div className="contentTypes-container">
                    {types.map(function (item, i) {
                        return (
                            <div
                                key={item.id}
                                className={
                                    item.id === checked
                                        ? "contentType-element contentType-element-active"
                                        : "contentType-element"
                                }
                            >
                                <label
                                    htmlFor={item.id}
                                    className={
                                        item.id === checked
                                            ? "contentTypeLabel active"
                                            : "contentTypeLabel"
                                    }
                                >
                                    {item.name}
                                </label>
                                <input
                                    type="radio"
                                    name="contentType"
                                    className="contentTypeRadio"
                                    checked={item.id === checked}
                                    onChange={handleRadioChange}
                                    value={item.id}
									disabled={item?.disabled}
                                    id={item.id}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="contentHelpText">{helpText}</div>
        </div>
    );
}
