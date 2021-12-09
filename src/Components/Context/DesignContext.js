import React, { createContext, useState, useEffect } from 'react';
import { initColorState } from '../../Data';
import fetchData from '../../HelperComponents/fetchData';
import { convertToRgbaCSS, validateImageUrl } from '../../HelperComponents/HelperFunctions';

export function DesignContextProvider(props) {
	// state of design context.
	const [initialState, setinitialState] = useState(initColorState);
	const [selectedImageUrl, setSelectedImageUrl] = useState(null);
	const [errors, setErrors] = useState('');

	// when Image has been selected from WordPress Thick box.
	window.send_to_editor = function(html) {
		
		var doc = new DOMParser().parseFromString(html, "text/xml");
		let image = doc.querySelector('img');
		if ( image ) {
			let imgurl = image.getAttribute('src');
			setSelectedImageUrl(imgurl);
		}
		tb_remove();
	}

	// setting the selected family in the state.
	const setSelectedFamily = ( family, value ) => {
		setinitialState({
			...initialState,
			fontFamily: family,
			fontFamilyValue: value,
		});
	}

	// function to change color.
	const handleColorChange = (itemName, color) => {
		setinitialState({
			...initialState,
			[itemName]: color
		});
	}

	// function to handle range.
	const handleRangeChange = ( value ) => {
		setinitialState({
			...initialState,
			opacity: value,
		})
	}

	// when clicked on upload media button, open the WordPress media upload iframe thickbox.
	const handleMedia = (  ) => {
		tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
	}

	// function to remove image when clicked on delete button.
	const deleteImage = () => {
		setSelectedImageUrl(null);
	}

	// useEffect when imageUrl is set in order to validate it.
	useEffect(() => {
		if ( selectedImageUrl === null || selectedImageUrl === false ) {
			return;
		}
		if ( ! validateImageUrl( selectedImageUrl ) ) {
			setSelectedImageUrl(null);
			setErrors('Please select files only of type [jpeg, jpg, png]');
		}
	}, [selectedImageUrl])

	// useEffect hook to get design data.
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
			if ( data.data.backgroundImage !== '' ) {
				setSelectedImageUrl(data.data.backgroundImage);
			}
        })
		.catch(err => {
		});
	}, []);

	// to change answer-highlight-box-color property value.
	useEffect(() => {
		const root = document.body;
		root?.style.setProperty(
		  "--answer-highlight-box-color",
		   convertToRgbaCSS(initialState.answersHighlightBoxColor)
		);
	}, [initialState]);

	// saving design context data.
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