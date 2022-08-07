import * as request from "./requester";

let baseUrl = "http://127.0.0.1:5000";

export const login = (email, password) =>request.post(`${baseUrl}/login`, { email, password });

