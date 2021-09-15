import React, { useState, useEffect } from "react";
import { dimensionTypes, shortcodeTypes } from "../../Data";

export default function ShareShortCode() {
	const [ copyStatus, setCopyStatus ] = useState('Copy Shortcode');
	let shortcodeInputRef = React.createRef();

	const [types, setTypes] = useState(shortcodeTypes);
	const [shortcode, setShortcode] = useState('');
	const [checked, setChecked] = useState('responsive');
	const [helpText, setHelpText] = useState('');

	const [width, setWidth] = useState({
		input: 100,
		select: '%',
	});
	const [height, setHeight] = useState({
		input: 700,
		select: 'px',
	});

	useEffect(() => {
		let id = new URLSearchParams(window.location.search).get('post_id');
		let shortcode = '[surveyfunnel_lite_survey id="'+ id +'" type="'+ checked +'"';
		if ( checked === 'custom' ) {
			let widthString = 'width="' + width.input + width.select + '"';
			let heightString = 'height="' + height.input + height.select + '"';
			shortcode += " " + widthString + " " + heightString;
		}
		shortcode += ']';
		setShortcode(shortcode);
		for(let i = 0 ; i < shortcodeTypes.length; i++) {
			if ( checked === shortcodeTypes[i].id ) {
				setHelpText(shortcodeTypes[i].helpText);
				return;
			}
		}
	}, [checked, width, height])

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
	
	const handleCustomChange = (e, type) => {
		switch( type ) {
			case 'width':
				let newWidth = JSON.parse(JSON.stringify( width ));
				newWidth[e.target.name] = e.target.value;
				setWidth(newWidth);
				break;
			case 'height':
				let newHeight = JSON.parse(JSON.stringify( height ));
				newHeight[e.target.name] = e.target.value;
				setHeight(newHeight);
				break;
			default:
				break;
		}
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
                                    id={item.id}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="contentHelpText">{helpText}</div>
			{checked === 'custom' && <div className="contentCustomAttributes">
				<div className="width">
					<label htmlFor="width">Width: </label>
					<input type="number" name="input" value={width.input} id="width" onChange={(e) => { handleCustomChange(e, 'width') }} />
					<select name="select" onChange={(e) => { handleCustomChange(e, 'width', true) }} defaultValue={width.select}>
						{dimensionTypes.map((item, i) => {
							return <option key={i} value={item} >{item}</option>
						})}
					</select>
				</div>
				<div className="height">
					<label htmlFor="height">Height: </label>
					<input type="number" name="input" value={height.input} id="height"  onChange={(e) => { handleCustomChange(e, 'height') }} />
					<select name="select" onChange={(e) => { handleCustomChange(e, 'height', true) }} defaultValue={height.select}>
						{dimensionTypes.map((item, i) => {
							return <option key={i} value={item}>{item}</option>
						})}
					</select>
				</div>
			</div>}
        </div>
    );
}
