const request = async (method, url, data) => {
    try {
        // let header = {"Access-Control-Allow-Origin": "*"};
        let headers = {};
        let buildRequest;
        if (method === "GET") {
            buildRequest = fetch(url, {});
        } else {
            // console.log(typeof data);
            // console.log(JSON.stringify(data));
            buildRequest = fetch(url, {
                method,
                headers: { 
                    'content-type': 'application/json',
                    "Access-Control-Request-Headers" : "Authorization"
                    // 'content-type': "text/plain" 
                },
                body: JSON.stringify(data),
            });
        }

        const response = await buildRequest;
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const get = request.bind({}, "GET");
export const post = request.bind({}, "POST");
export const put = request.bind({}, "PUT");
export const del = request.bind({}, "DELETE");
