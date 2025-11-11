import api from "./api";

/**
 * Authentication utilities for NestJS backend
 * Your NestJS backend will handle JWT tokens or session-based auth
 */

// Type definitions
export interface User {
  id: string;
  email: string;
  name: string;
  weddingId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

/**
 * Login user - calls NestJS backend
 */
export async function login(credentials: LoginCredentials): Promise<User> {
  try {
    const response = await api.post("/auth/login", credentials);
    
    // Store token if using JWT
    if (response.data.accessToken) {
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
    }
    
    return response.data.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

/**
 * Register new user - calls NestJS backend
 */
export async function register(data: RegisterData): Promise<User> {
  try {
    const response = await api.post("/auth/register", data);
    
    // Store token if using JWT
    if (response.data.accessToken) {
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
    }
    
    return response.data.user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
    
    // Clear token
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

/**
 * Get current user from NestJS backend
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch (error) {
    return false;
  }
}

/**
 * Refresh access token (if using JWT refresh tokens)
 */
export async function refreshToken(): Promise<string | null> {
  try {
    const response = await api.post("/auth/refresh");
    
    if (response.data.accessToken) {
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      return response.data.accessToken;
    }
    
    return null;
  } catch (error) {
    console.error("Token refresh error:", error);
    return null;
  }
}
