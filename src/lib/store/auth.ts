"use client";

const AUTH_KEY = "vedvyas_auth";

export interface AuthUser {
  name: string;
  email: string;
  avatarInitial: string;
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function loginUser(name: string, email: string): AuthUser {
  const user: AuthUser = {
    name,
    email,
    avatarInitial: name.trim().charAt(0).toUpperCase(),
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export function logoutUser(): void {
  localStorage.removeItem(AUTH_KEY);
}
