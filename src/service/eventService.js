import * as request from "../service/requester";

const baseURL = "http://127.0.0.1:5000/event?token=";

export const startEvent = (token, data) => request.post(`${baseURL}${token}`, data);

export const eventState = (token) => request.get(`${baseURL}${token}`);
