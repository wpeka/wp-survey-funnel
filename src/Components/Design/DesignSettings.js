import React, { useContext, useEffect } from 'react';
import { designColors } from '../../Data';
import { DesignContext } from '../Context/DesignContext';
import { PopoverPicker } from '../../HelperComponents/ColorPicker';

const fontFamily = require('../../Data/google-fonts.json');

export default function DesignSettings() {
	const designCon = useContext( DesignContext );
	
	const handleChange = (color, itemName) => {
		designCon.handleColorChange(itemName, color);
	}

	const handleRangeChange = (e) => {
		designCon.handleRangeChange(e.target.value);
	}

	useEffect(() => {
		if ( designCon.fontFamilyValue === '' ) {
			return;
		}
		let fontID = designCon.fontFamilyValue;
		if (!document.getElementById(fontID)) {
			var head = document.getElementsByTagName('head')[0];
			var link = document.createElement('link');
			link.id = fontID;
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = 'http://fonts.googleapis.com/css?family='+fontID;
			link.media = 'all';
			head.appendChild(link);
		}

	}, [designCon.fontFamilyValue])

	const handleSelection = (e) => {
		var select = e.target;
		designCon.setSelectedFamily(select.options[select.selectedIndex].innerHTML, select.options[select.selectedIndex].value);
	}

	return (
		<div className="surveyfunnel-lite-design-setting-fields">
			<div className="fontFamily-picker surveyfunnel-lite-design-elements">
				<h2>Text</h2>
				<div className="surveyfunnel-lite-font-family-container">
					<h4>Font Family</h4>
					<select onChange={handleSelection} value={designCon.fontFamilyValue}>
						{fontFamily.map(function(item) {
							return <option key={item.value} value={item.value}>{item.name}</option>
						})}
					</select>
				</div>
			</div>
			<div className="color-pickers surveyfunnel-lite-design-elements">
				<h2>Color</h2>
				<div className="surveyfunnel-lite-design-color-container">
					{designColors.map(function(item, i) {
						return <div key={i} className="surveyfunnel-lite-design-color-type">
							<h4>{item.name}</h4>
							<PopoverPicker color={designCon[item.itemName]} onChange={(color) => {handleChange(color, item.itemName)}} />
						</div>
					})}
				</div>
			</div>
			<div className="file-picker surveyfunnel-lite-design-elements">
				<div className="surveyfunnel-lite-img-upload-container">
					<span>Background Image (Recommended image size 1920x1080px)</span>
					<label htmlFor="surveyfunnel-lite_bg_img" className="surveyfunnel-lite-custom-file-upload">
						<input id="surveyfunnel-lite_bg_img" type="file" name="file" onChange={designCon.changeHandler} />
						Upload Image
					</label>
				</div>
				<div className="opacity-picker surveyfunnel-lite-opacity-section">
					<span>Image Opacity</span>
					<input type="range" value={designCon.opacity} min='0' max='1' step="0.10" onChange={handleRangeChange} />
					<div className="surveyfunnel-lite-opacity-percentage">
						<span>0%</span>
						<span>100%</span>
					</div>
				</div>
			</div>
		</div>
	)
}
