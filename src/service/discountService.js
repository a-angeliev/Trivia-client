import * as request from "./requester";

let baseUrl = "http://127.0.0.1:5000/discounts";

export const createDiscount = (data) => request.post(baseUrl, data);

export const editDiscount = (data, discountId) => request.put(`${baseUrl}/${discountId}/edit`, data);

export const deleteDiscount = (discountId) => request.del(`${baseUrl}/${discountId}/edit`);
