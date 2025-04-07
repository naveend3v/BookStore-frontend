import { createContext, useState } from "react";
import { useContext } from "react";
import { adminLoginApiService } from "./AuthApiService";
import { ApiClient } from "../../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthentication] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(null);

    async function login(username, password) {
        try {

            const resp = await adminLoginApiService(username, password);

            if (resp.status === 200) {
                const jwtToken = "Bearer " + resp.data.JwtToken
                setAuthentication(true);
                setToken(jwtToken);

                ApiClient.interceptors.request.use(
                    (config) => {
                        console.log('Intercepting and adding token to request')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )
                return {'loginStatus':true}
            } else {
                console.log('ERROR : ' + resp.data.message)
                setErrorMessage(resp.data.message)
                logout()
                return {'loginStatus':false, 'message':resp.data.message}
            }
        } catch (error) {
            console.log('ERROR : ', error)
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage("An unexpected error occurred.")
            }        
            logout()            
            return {'loginStatus':false, 'message': error.response.data.message}
        }
        

    }

    function logout() {
        setAuthentication(false)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthentication, login, token, logout, errorMessage }}>
            {children}
        </AuthContext.Provider>
    )
}