import React, { useEffect, useState } from 'react'
import fetchData from '../../HelperComponents/fetchData';

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
            action: 'wpsf_get_configuration_data',
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

	const saveConfiguration = () => {
		const ajaxSecurity = document.getElementById('ajaxSecurity').value;
        const post_id = new URLSearchParams(window.location.search).get('post_id');
        const data = {
            security: ajaxSecurity,
            action: 'wpsf_save_configuration_data',
            post_id,
			configuration: JSON.stringify({metaInfo, companyBranding})
        };
        const ajaxURL = document.getElementById('ajaxURL').value;
        fetchData( ajaxURL, data )
        .then(data => {
            console.log(data);
        })
	}

	return (
		<div className="Configure">
			<div className="configurationLeft">
				General Settings
			</div>
			<div className="configurationRight">
				<div className="meta-info">
					<h3>Meta Information</h3>
					<p>Used by social networks and search engines</p>
					<label htmlFor="title">Title: </label>
					<input type="text" value={metaInfo.title} name="title" onChange={handleMetaChange} />
					<label htmlFor="description">Description: </label>
					<textarea value={metaInfo.description} name="description" cols="30" rows="10" onChange={handleMetaChange}></textarea>
					<h3>Company Branding</h3>
					<p>Logo visible on deployed content: </p>
					<input type="checkbox" checked={companyBranding} onChange={() => {setCompanyBranding(!companyBranding)}} />
					<button type="button" onClick={saveConfiguration}>save</button>
				</div>
			</div>
		</div>
	)
}
