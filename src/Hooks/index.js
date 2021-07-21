import React from "react";

export default function useFetch(data) {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
			const formData = new FormData();
			const ajaxURL = document.getElementById('ajaxURL').value;
			Object.keys(data).forEach(key => formData.append(key, data[key]));
            try {
                const res = await fetch(ajaxURL, {
					method: 'POST',
					body: formData
				});
                const json = await res.json();
                setResponse(json);
                setIsLoading(false);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);
    return { response, error, isLoading };
}
