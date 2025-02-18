import { ApiClient } from "../../api/ApiClient";

export const adminLoginApiService = (username, password) => ApiClient.post(`/admin/login`, { username, password });

export const adminGetAllBooksApiService = () => ApiClient.get(`/admin/books`);

export const uploadImgApiService = (formData) => ApiClient.post('/admin/upload/image', formData, { Headers: { 'Content-Type': 'multipart/form-data' }, });

export const deleteImgApiService = (imageName) => ApiClient.post(`/admin/delete/${imageName}`);

export const addNewBookApiService = (newBookData) => ApiClient.post('/admin/books', newBookData);

export const getBookApiService = (id) => ApiClient.get(`/admin/books/${id}`);

export const updateBookApiService = (Book, BookID) => ApiClient.put(`/admin/books/${BookID}`, Book)