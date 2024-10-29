import { SignUpRequest, SignUpResponse } from "../types/Authentication/AuthService.types";

const BASE_URL = "http://localhost:3000";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_email: email, user_password: password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const signUp = async (params: SignUpRequest): Promise<SignUpResponse> => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Sign-up failed");
  }

  return response.json();
};

export const logout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, status: 200 });
    }, 1000);
  });
};
