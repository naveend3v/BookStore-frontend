import axios from 'axios';

export const ApiClient = axios.create({
    baseURL: 'http://localhost:5001/',
    Origin: 'http://localhost:3000',
})

export const adminApiGetBooks = (token) => ApiClient.get(`/admin/books`, {
    headers: {
        Authorization: token
    }
});