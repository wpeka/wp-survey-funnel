import React, { useContext } from 'react';
import { designColors } from '../../Data';
import { DesignContext } from '../Context/DesignContext';
import { PopoverPicker } from '../../HelperComponents/ColorPicker';

export default function DesignSettings() {
	const designCon = useContext( DesignContext );
	
	const handleChange = (color, itemName) => {
		designCon.handleColorChange(itemName, color);
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
		</div>
	)
}
