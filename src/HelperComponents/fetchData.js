/**
 * FetchData JS.
 *
 * @since 1.0.0
 * @package Surveyfunnel_Lite/HelperComponents
 */

const fetchData    = async( url, data ) => {
	const formData = new FormData();
	Object.keys( data ).forEach( key => formData.append( key, data[key] ) );
	// Default options are marked with *.
	const response = await fetch(
		url,
		{
			method: 'POST',
			body: formData
		}
	);
	return response.json();
}

export default fetchData;
