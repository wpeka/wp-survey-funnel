import React, { createContext, useState, useEffect } from 'react'
import { popupInitialState, shortcodeTypes } from '../../Data';
import fetchData from '../../HelperComponents/fetchData';

export function ShareContextProvider( props ) {
	const [popup, setPopup] = useState(popupInitialState);
	const [options, setOptions] = useState([]);

	const handleDevicesChange = (id) => {
		let newPopup = JSON.parse(JSON.stringify(popup));
		let { targettingOptions } = newPopup;
		for( let i = 0 ; i < targettingOptions.devices.length ; i++ ) {
			if ( targettingOptions.devices[i].id === id ) {
				targettingOptions.devices[i].checked = ! targettingOptions.devices[i].checked;
				break;
			}
		}

		setPopup(newPopup);
	}

	const saveSettings = (e) => {
		e.target.classList.add('surveyfunnel-lite-button-loading');
		const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'surveyfunnel_lite_save_share_data',
            post_id,
			share: JSON.stringify({popup})
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData( ajaxURL, data )
        .then(data => {
			e.target.classList.remove('surveyfunnel-lite-button-loading');
        })
	}

	const handleTriggerPageChange = (e) => {
		let newPopup = JSON.parse(JSON.stringify(popup));
		newPopup.targettingOptions.triggerPage = e.target.value;
		setPopup(newPopup);
	}

	useEffect(() => {
		const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'surveyfunnel_lite_get_share_data',
            post_id,
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData( ajaxURL, data )
        .then(data => {
			if ( data.data.share === '' ) {
				return;
			}
			let share = JSON.parse(data.data.share);
			setPopup(share.popup);
        })

		const getOptions = () => {
			const ajaxSecurity = document.getElementById('ajaxSecurity').value;
			const post_id = new URLSearchParams(window.location.search).get('post_id');
			const data = {
				security: ajaxSecurity,
				action: 'surveyfunnel_lite_get_posts_pages',
				post_id,
			};
			const ajaxURL = document.getElementById('ajaxURL').value;
			fetchData( ajaxURL, data )
			.then(data => {
				setOptions(data.data);
			})
		}

		getOptions();
	}, [])

	const optionsChange = (data) => {
		let newPopup = JSON.parse(JSON.stringify(popup));
		newPopup.targettingOptions.selectedPagesAndPosts = data;
		setPopup(newPopup);
	}

	const handleLaunchOptionsChange = ( data ) => {
		let newPopup = JSON.parse(JSON.stringify(popup));
		newPopup.behaviourOptions.launchOptions.launchWhen = data;
		setPopup(newPopup);
	}

	const handleLaunchOptionsData = ( data, e ) => {
		if(data === 'afterScrollPercentage') {
			const bubble = document.querySelector(".surveyfunnel-lite-bubble");
			const range = e.target;
			const val = range.value;
			const min = range.min ? range.min : 0;
			const max = range.max ? range.max : 100;
			const newVal = Number(((val - min) * 100) / (max - min));
			bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
			bubble.innerHTML = val+'%';
		}

		let newPopup = JSON.parse(JSON.stringify(popup));
		newPopup.behaviourOptions.launchOptions[data] = e.target.value;
		setPopup(newPopup);
	}

	const handleFrequencyOptionsChange = ( data ) => {
		let newPopup = JSON.parse(JSON.stringify(popup));
		newPopup.behaviourOptions.frequencyOptions.frequency = data;
		setPopup(newPopup);
	}

	const handleFrequencyDataChange = (data, value) => {
		let newPopup = JSON.parse(JSON.stringify(popup));
		newPopup.behaviourOptions.frequencyOptions[data] = value;
		setPopup(newPopup);
	}

	const handlePopupActivation = () => {
		let newPopup = JSON.parse(JSON.stringify(popup));
		newPopup.active = !newPopup.active;
		setPopup(newPopup);
	}

	let state = {
		popup,
		handleDevicesChange,
		saveSettings,
		handleTriggerPageChange,
		optionsChange,
		options,
		handleLaunchOptionsChange,
		handleLaunchOptionsData,
		handleFrequencyOptionsChange,
		handleFrequencyDataChange,
		handlePopupActivation
	}

	return (
		<ShareContext.Provider value={{...state}}>
			{props.children}
		</ShareContext.Provider>
	)
}

export const ShareContext = createContext();