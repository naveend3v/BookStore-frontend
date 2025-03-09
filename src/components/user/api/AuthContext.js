import { createContext, useContext, useState } from "react";
import { userLoginAPIService } from "./AuthApiService";
import { ApiClient } from "../../api/ApiClient";

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthentication] = useState(false)
    const [token, setToken] = useState(null);
    const [username,setUsername] = useState(null);

    async function login(userDetails) {
        try {
            const resp = await userLoginAPIService(userDetails);
            setUsername(userDetails.username);
            const jwtToken = "Bearer " + resp.data.JwtToken

            if (resp.status === 200) {
                setAuthentication(true);
                setToken(jwtToken);

                ApiClient.interceptors.request.use(
                    (config) => {
                        console.log('Intercepting and adding token to request')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true

            } else {
                logout()
                return false;
            }
        } catch (error) {
            logout()
            return false;
        }

    }

    function logout() {
        setAuthentication(false)
        setToken(null)
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthentication, login, token, logout, username }}>
            {children}
        </AuthContext.Provider>
    )
}
