import { ApiClient } from "../../api/ApiClient";

export const adminLoginApiService = (username,password) => ApiClient.post(`/admin/login`,{username,password});

export const adminGetAllBooksApiService = () => ApiClient.get(`/admin/books`);