import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export const Register = () => {
    const { register } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Register</h2>
            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full" />
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" />
            <button onClick={() => register(username,email, password)} className="bg-blue-600 text-white px-4 py-2 rounded">
                Register
            </button>
        </div>
    );
}
