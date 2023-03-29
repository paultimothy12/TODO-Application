import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";


export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [token, setToken] = useState(null)


async function login(username, password) {

  
    try {

        const response = await executeJwtAuthenticationService(username,password)

        if(response.status===200){
            const JwtToken = 'Bearer '+ response.data.token
            setAuthenticated(true)
            setToken(JwtToken)
            apiClient.interceptors.request.use(
                (config)=>{config.headers.Authorization=JwtToken 
                            return config
                        }
            )
            return true            
        } else {
            logout()
            return false
        }    
    } catch(error) {
        logout()
        return false
    }
}
   

    function logout() {
        setAuthenticated(false)
        setToken(null)
    }


    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout,token}  }>
            {children}
        </AuthContext.Provider>
    )
} 