import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { createGStore } from "create-gstore";
import { publicFetchClient } from "../api/instance";

interface Session {
  userId: string;
  email: string;
  exp: number;
  iat: number;
}

let refreshTokenPromise: Promise<string | null> | null = null;

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

  const refreshToken = async (): Promise<string | null> => {
    if (!token) return null;

    const session = jwtDecode<Session>(token);
    if (session.exp >= Date.now() / 1000 + 1) return null;

    if (!refreshTokenPromise) {
      refreshTokenPromise = publicFetchClient
        .POST("/auth/refresh")
        .then((r) => r.data?.accessToken ?? null)
        .then((newToken) => {
          if (newToken) {
            login(newToken);
            return newToken;
          } else {
            logout();
            return null;
          }
        })
        .finally(() => {
          refreshTokenPromise = null;
        });
    }

    return await refreshTokenPromise;
  };

  return { login, logout, session, refreshToken };
});
