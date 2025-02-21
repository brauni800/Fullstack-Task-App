"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setUser({ username: decoded.sub });
    }
  }, []);

  async function login(username: string, password: string) {
    try {
      // Convert login data into `application/x-www-form-urlencoded` format
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      // Make API request with form data
      const response = await api.post("/users/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      // Store token and update user state
      localStorage.setItem("access_token", response.data.access_token);
      const decoded: any = jwtDecode(response.data.access_token);
      setUser({ username: decoded.sub });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
