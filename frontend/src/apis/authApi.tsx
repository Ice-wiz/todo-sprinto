import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const loginUser = async (email: string, password: string): Promise<string | null> => {
  try {
    const res = await axios.post(`${API}/login`, { email, password });
    return res.data.token;
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<string | null> => {
  try {
    const res = await axios.post(`${API}/register`, { username, email, password });
    return res.data.token;
  } catch (err) {
    console.error("Register error:", err);
    return null;
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const res = await axios.get(`${API}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Get user error:", err);
    return null;
  }
};
