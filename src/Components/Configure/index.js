import React, { useEffect, useState } from 'react'
import fetchData from '../../HelperComponents/fetchData';
import '../../scss/configure.scss';


export default function Configure() {
	const [metaInfo, setMetaInfo] = useState({
		title: '',
		description: ''
	});

	const [companyBranding, setCompanyBranding] = useState(true);

	useEffect(() => {
		const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'surveyfunnel_lite_get_configuration_data',
            post_id,
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData( ajaxURL, data )
        .then(data => {
            if ( data.data.configure === '' ) {
				return;
			}
			let configure = JSON.parse(data.data.configure);
			setMetaInfo(configure.metaInfo);
			setCompanyBranding(configure.companyBranding);
        })
	}, []);

	const handleMetaChange = (e) => {
		setMetaInfo({
			...metaInfo,
			[e.target.name]: e.target.value,
		});
	}

	const saveConfiguration = (e) => {
		e.target.classList.add('surveyfunnel-lite-button-loading');
		const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'surveyfunnel_lite_save_configuration_data',
            post_id,
			configuration: JSON.stringify({metaInfo, companyBranding})
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData( ajaxURL, data )
        .then(data => {
			e.target.classList.remove('surveyfunnel-lite-button-loading');
        })
	}

	return (
		<div className="configure">
			<div className="configurationLeft">
				<div className="configurationLeft-element">
					<div className="configurationLeft-element-title">
						<h3>General</h3>
						<p>Basic settings</p>
					</div>
					<img src={require('../Build/BuildImages/arrowRight.png')}></img>
				</div>
			</div>
			<div className="configurationRight">
				<div className="meta-info">
					<div className="configure-fields">
						<div className="meta-info-container">
							<h3>Meta Information</h3>
							<p>Used by social networks and search engines</p>
							<label htmlFor="title">Title: </label>
							<input type="text" value={metaInfo.title} name="title" onChange={handleMetaChange} />
							<label htmlFor="description">Description: </label>
							<textarea value={metaInfo.description} name="description" cols="30" rows="10" onChange={handleMetaChange}></textarea>

						</div>
						<div className="company-name-container">
							<h3>Company Branding</h3>
							<div className="companyLogoBox">
								<p>Logo visible on deployed content:</p>
								<input id="useCompanyLogo" type="checkbox" checked={companyBranding} onChange={() => {setCompanyBranding(!companyBranding)}} />
								<label htmlFor="useCompanyLogo" > </label>
							</div>
						</div>

					</div>

					<div className="meta-info-save-container">
						<button type="button" onClick={saveConfiguration}>Save</button>
					</div>
				</div>
			</div>
		</div>
	)
}
