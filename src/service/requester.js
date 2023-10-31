const request = async (method, url, data) => {
    try {
        let headers = {};
        let user = localStorage.getItem("auth");
        if (user !== null) {
            user = JSON.parse(user);
        }
        if (user ? user.token : false) {
            headers = { Authorization: `Bearer ${user.token}` };
        }

        let buildRequest;
        if (method === "GET") {
            buildRequest = fetch(url, { headers });
        } else {
            console.log(typeof JSON.stringify(data));
            buildRequest = fetch(url, {
                method,
                headers: {
                    ...headers,
                    "content-type": "application/json",
                    "Access-Control-Request-Headers": "Authorization",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(data),
            });
        }

        const response = await buildRequest;
        console.log(response, 123);
        const result = await response.json();
        console.log(result, 345);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const get = request.bind({}, "GET");
export const post = request.bind({}, "POST");
export const put = request.bind({}, "PUT");
export const del = request.bind({}, "DELETE");
