import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { createGStore } from "create-gstore";

interface Session {
  userId: string;
  email: string;
  exp: number;
  iat: number;
}

const TOKEN_KEY = "token";
export const useSession = createGStore(() => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));

  const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const session = token ? jwtDecode<Session>(token) : null;

  return {
    token,
    login,
    logout,
    session,
  };
});
