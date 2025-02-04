import axios from 'axios';

export const ApiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    Origin: 'http://localhost:3000',
})

export const adminApiGetBooks = (token) => ApiClient.get(`/admin/books`, {
    headers: {
        Authorization: token
    }
});