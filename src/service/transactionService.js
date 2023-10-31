import * as request from "./requester";

const baseURL = "http://127.0.0.1:5000/transaction";

export const createTransaction = (data) => request.post(baseURL, data);
