"use client";

import { useState, useEffect } from "react";
import { getAuthUser, loginUser, logoutUser, type AuthUser } from "@/lib/store/auth";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getAuthUser());
    setReady(true);
  }, []);

  const login = (name: string, email: string) => {
    const u = loginUser(name, email);
    setUser(u);
    return u;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return { user, ready, login, logout };
}
