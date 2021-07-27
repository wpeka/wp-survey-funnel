import React, { useContext } from 'react';
import { designColors, fontFamily } from '../../Data';
import { DesignContext } from '../Context/DesignContext';
import { PopoverPicker } from '../../HelperComponents/ColorPicker';

export default function DesignSettings() {
	const designCon = useContext( DesignContext );
	
	const handleChange = (color, itemName) => {
		designCon.handleColorChange(itemName, color);
	}

	const handleRangeChange = (e) => {
		designCon.handleRangeChange(e.target.value);
	}

	const handleSelection = (e) => {
		var select = e.target;
    	if (select.selectedIndex > 0) { // web font
			var fontID = select.options[select.selectedIndex].value;
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
			designCon.setSelectedFamily(select.options[select.selectedIndex].innerHTML, select.options[select.selectedIndex].value);
		} else { // default browser font
			designCon.setSelectedFamily(null, '');
		}
	}

	return (
		<div>
			<div className="color-pickers">
				<h3>Color</h3>
				{designColors.map(function(item, i) {
					return <div key={i}>
						<p>{item.name}</p>
						<PopoverPicker color={designCon[item.itemName]} onChange={(color) => {handleChange(color, item.itemName)}} />
					</div>
				})}
			</div>
			<div className="file-picker">
				<h3>image</h3>
				<input type="file" name="file" onChange={designCon.changeHandler} />
			</div>
			<div className="opacity-picker">
				<input type="range" value={designCon.opacity} min='0' max='1' step="0.10" onChange={handleRangeChange} />
			</div>
			<div className="fontFamily-picker">
				<select onChange={handleSelection} value={designCon.fontFamilyValue}>
					{fontFamily.map(function(item) {
						return <option key={item.value} value={item.value}>{item.name}</option>
					})}
				</select>
			</div>
		</div>
	)
}
