

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, getCurrentUser } from "../apis/authApi.tsx";


export interface User {
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export const useAuth = () => useContext(AuthContext)


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        if (token) {
            getCurrentUser(token).then((res: User | null) => {
                if (res) {
                    setUser(res)
                }
            }).finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [token])


    const login = async (email: string, password: string) => {
        const token = await loginUser(email, password)

        if (token) {
            localStorage.setItem("token", token)
            setToken(token)
            const user = await getCurrentUser(token)
            setUser(user)
            navigate('/dashboard')
        }
    }

    const register = async (username: string, email: string, password: string) => {
        const token = await registerUser(username, email, password);
        if (token) {
            localStorage.setItem("token", token);
            setToken(token);
            const user = await getCurrentUser(token);
            setUser(user);
            navigate("/dashboard");
        }
    };

    const logout = async () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={
            { user, token, loading, login, register, logout }
        }
        >
            {children}
        </AuthContext.Provider>

    )
}


