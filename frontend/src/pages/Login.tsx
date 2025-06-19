import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Login</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
            <div className="flex space-x-4">
                <button onClick={() => login(email, password)} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Login
                </button>

                <button onClick={() => navigate('/register')} className="bg-blue-600 text-white px-4 py-2 rounded">
                    Register
                </button>
            </div>

        </div>
    );
}
