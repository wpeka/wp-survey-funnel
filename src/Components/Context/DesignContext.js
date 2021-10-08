import React, { createContext, useState, useEffect } from 'react';
import { initColorState } from '../../Data';
import fetchData from '../../HelperComponents/fetchData';
import { convertToRgbaCSS, validateImageUrl } from '../../HelperComponents/HelperFunctions';

export function DesignContextProvider(props) {
	
	const [initialState, setinitialState] = useState(initColorState);
	const [selectedImageUrl, setSelectedImageUrl] = useState(null);
	const [errors, setErrors] = useState('');

	window.send_to_editor = function(html) {
		var doc = new DOMParser().parseFromString(html, "text/xml");
		let imgurl = doc.firstChild.getAttribute('src');
		setSelectedImageUrl(imgurl);
		tb_remove();
	}

	const setSelectedFamily = ( family, value ) => {
		setinitialState({
			...initialState,
			fontFamily: family,
			fontFamilyValue: value,
		});
	}

	const handleColorChange = (itemName, color) => {
		setinitialState({
			...initialState,
			[itemName]: color
		});
	}

	const handleRangeChange = ( value ) => {
		setinitialState({
			...initialState,
			opacity: value,
		})
	}

	const handleMedia = (  ) => {
		tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
	}

	const deleteImage = () => {
		setSelectedImageUrl(null);
	}

	useEffect(() => {
		console.log(selectedImageUrl);
		if ( selectedImageUrl === null || selectedImageUrl === false ) {
			console.log('hellow orld');
			return;
		}
		if ( ! validateImageUrl( selectedImageUrl ) ) {
			setSelectedImageUrl(null);
			setErrors('Please select files only of type [jpeg, jpg, png]');
		}
	}, [selectedImageUrl])

	useEffect(() => {
		const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'surveyfunnel_lite_get_design_data',
            post_id,
        };
        const ajaxURL = document.getElementById('ajaxURL').value;

		fetchData( ajaxURL, data )
		.then(data => {
			if ( data.data.design === '' ) {
				return;
			}
			const design = JSON.parse( data.data.design );
			setinitialState(design);
			if ( data.data.backgroundImage !== false ) {
				setSelectedImageUrl(data.data.backgroundImage);
			}
        });
	}, []);

	useEffect(() => {
		const root = document.body;
		root?.style.setProperty(
		  "--answer-highlight-box-color",
		   convertToRgbaCSS(initialState.answersHighlightBoxColor)
		);
	}, [initialState]);

	const saveContext = (e) => {
		e.target.classList.add('surveyfunnel-lite-button-loading');

		const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'surveyfunnel_lite_save_design_data',
            post_id,
			state: JSON.stringify( { ...initialState } ),
			selectedImageUrl,
        };
        const ajaxURL = document.getElementById('ajaxURL').value;

		fetchData( ajaxURL, data )
		.then(data => {
			e.target.classList.remove('surveyfunnel-lite-button-loading');
        });
	}

	return (
		<DesignContext.Provider
			value={{...initialState, errors, handleColorChange, handleRangeChange, saveContext, selectedImageUrl, deleteImage, setSelectedFamily, handleMedia}}
		>
			{props.children}
		</DesignContext.Provider>
	);
}

export const DesignContext = createContext();