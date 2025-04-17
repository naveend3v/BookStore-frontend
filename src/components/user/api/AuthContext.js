import { createContext, useContext, useState, useEffect } from "react";
import { userLoginAPIService } from "./AuthApiService";
import { ApiClient } from "../../api/ApiClient";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthentication] = useState(
        sessionStorage.getItem("isAuthenticated") === "true"
    );
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [username, setUsername] = useState(sessionStorage.getItem("username"));
    const [interceptor, setInterceptor] = useState(null);
    const [checkoutSessionId, setCheckoutSessionId] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (token) {
            const newInterceptor = ApiClient.interceptors.request.use((config) => {
                config.headers.Authorization = token;
                return config;
            });
            setInterceptor(newInterceptor);
        }
    }, [token]);

    async function login(userDetails) {
        try {
            const resp = await userLoginAPIService(userDetails);

            if (resp.status === 200) {
                const jwtToken = "Bearer " + resp.data.JwtToken;

                setAuthentication(true);
                setToken(jwtToken);
                setUsername(userDetails.username);

                // Store in sessionStorage
                sessionStorage.setItem("isAuthenticated", "true");
                sessionStorage.setItem("token", jwtToken);
                sessionStorage.setItem("username", userDetails.username);

                return { 'loginStatus': true }

            } else {
                console.log('ERROR : ' + resp.data.message)
                setErrorMessage(resp.data.message)
                logout()
                return { 'loginStatus': false, 'message': resp.data.message }
            }
        } catch (error) {
            console.log('ERROR : ', error)
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage("An unexpected error occurred.")
            }
            logout()
            return { 'loginStatus': false, 'message': error.response.data.message }
        }
    }

    function logout() {
        setAuthentication(false);
        setToken(null);
        setUsername(null);

        // Remove from sessionStorage
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");

        if (interceptor !== null) {
            ApiClient.interceptors.request.eject(interceptor);
            setInterceptor(null);
        }
        window.location.reload();
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthentication, login, token, logout, username, checkoutSessionId, setCheckoutSessionId, errorMessage }}>
            {children}
        </AuthContext.Provider>
    );
}