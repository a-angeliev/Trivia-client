const request = async (method, url, data) => {
    try {
        let headers = {};
        let user = localStorage.getItem("auth")
        if(user!= {}){
            user = JSON.parse(user)
        }
        // console.log(JSON.parse(user)['token']);
        if(user.token){
            headers={'Authorization': `Bearer ${user.token}`}
        }
        
        let buildRequest;
        if (method === "GET") {
            buildRequest = fetch(url, {headers});
        } else {
            buildRequest = fetch(url, {
                method,
                headers: {
                    ...headers,
                    "content-type": "application/json",
                    "Access-Control-Request-Headers": "Authorization",
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
