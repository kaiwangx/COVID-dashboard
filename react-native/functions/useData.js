import { useState, useEffect } from 'react';

export default function useData(dataCollector) {
    // data fetching code based on
    // https://reactjs.org/docs/testing-recipes.html#data-fetching
    const [data, setData] = useState(null);

    useEffect(() => {
        // isMounted logic based on
        // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component 
        let isMounted = true;
        async function fetchData() {
            const response = await dataCollector();
            if (isMounted) {
                setData(response);
            }
        }
        fetchData();
        return () => {isMounted = false;};
    }, []);

    return data;
}