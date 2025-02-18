import { ApiClient } from "../../api/ApiClient";

const userLoginAPIService = (username, password) => ApiClient.post('/user/login', {username,password})

const userSignUpAPIService = (username, password) => ApiClient.post('/user/signup', {username,password})