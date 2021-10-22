const fetchData = async (url, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    return response.json();
}

export default fetchData;