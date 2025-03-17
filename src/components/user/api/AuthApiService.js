import { ApiClient } from "../../api/ApiClient";

export const userLoginAPIService = (userDetails) => ApiClient.post('/user/login', userDetails)
export const userSignUpAPIService = (userDetails) => ApiClient.post('/user/signup', userDetails)
export const getAllBooksAPIService = () => ApiClient.get('/user/books')
export const getBookAPIService = (id) => ApiClient.get(`/user/books/${id}`)
export const getAllCartAPIService = () => ApiClient.get(`/user/cart`)
export const addtoCartAPIService  = (productDetails) => ApiClient.post(`/user/cart/add`,productDetails)
export const updateCartItemAPIService = (cartItemId,productDetails) => ApiClient.put(`/user/cart/update/${cartItemId}`,productDetails);
export const deleteCartItemAPIService = (cartItemId) => ApiClient.delete(`/user/cart/delete/${cartItemId}`);