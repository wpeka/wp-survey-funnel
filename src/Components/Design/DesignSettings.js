import React, { useContext } from 'react';
import { designColors } from '../../Data';
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
		</div>
	)
}
