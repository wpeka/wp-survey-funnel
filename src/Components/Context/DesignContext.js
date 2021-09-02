import React, { createContext, useState, useEffect } from 'react';
import { initColorState } from '../../Data';
import fetchData from '../../HelperComponents/fetchData';
import { convertToRgbaCSS } from '../../HelperComponents/HelperFunctions';

export function DesignContextProvider(props) {
	
	const [initialState, setinitialState] = useState(initColorState);
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedImageUrl, setSelectedImageUrl] = useState(null);

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

	const changeHandler = (event) => {
		if ( event.target.files[0] !== undefined ) {
			setSelectedImage(event.target.files[0]);
			setSelectedImageUrl(URL.createObjectURL(event.target.files[0]));
		}
		else {
			setSelectedImageUrl(null);
			setSelectedImage(null);
		}
	};

	useEffect(() => {
		const root = document.body;
		root?.style.setProperty(
		  "--answer-highlight-box-color",
		   convertToRgbaCSS(initialState.answersHighlightBoxColor)
		);
	}, [initialState]);

	useEffect(() => {
		if ( selectedImage === null || selectedImage === undefined ) {
			return;
		}
		let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
		if ( !allowedExtensions.exec(selectedImage.name) ) {
			setSelectedImage(null);
		}
	}, [selectedImage]);

	const saveContext = (e) => {
		e.target.classList.add('surveyfunnel-lite-button-loading');

		const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'surveyfunnel_lite_save_design_data',
            post_id,
			state: JSON.stringify( { ...initialState } ),
        };
        const ajaxURL = document.getElementById('ajaxURL').value;

		fetchData( ajaxURL, data, selectedImage )
		.then(data => {
			e.target.classList.remove('surveyfunnel-lite-button-loading');

        });
	}

	return (
		<DesignContext.Provider
			value={{...initialState, handleColorChange, changeHandler, handleRangeChange, saveContext, selectedImageUrl, setSelectedFamily}}
		>
			{props.children}
		</DesignContext.Provider>
	);
}

export const DesignContext = createContext();