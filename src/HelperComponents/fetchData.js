const fetchData = async (url, data, File = null) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    // Default options are marked with *
    if ( File !== null ) {
        formData.append( 'designImage', File, File.name );
    }
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    return response.json();
}

export default fetchData;