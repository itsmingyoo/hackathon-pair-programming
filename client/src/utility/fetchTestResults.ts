export interface FetchRoutes {
    '1': string;
    // add more here when you get more routes/problems
}

const fetchRoutes: FetchRoutes = {
    '1': '/api/problem/add-two-sum',
    // add more problems here with their routes
};

// problemId must be a key to get the correct fetch route that will test the problem
export const fetchTestResults = async (value: string, problemId: keyof FetchRoutes) => {
    const response = await fetch(fetchRoutes[problemId], {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: value }),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log('Error fetching to the backend');
        return { error: 'Fetch failed', statusCode: response.status };
    }
};
