import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import * as AuthService from "../services/AuthService";
import { AuthState } from "../types/Authentication/AuthStore.types";
import {
  LoginRequest,
  SignUpRequest,
  SignUpResponse,
} from "../types/Authentication/AuthService.types";

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        rememberedEmail: null,
        token: null,
        userId: null,
        userName: null, 
        lastName: null,
        avatar: null,
        email: null,
        error: null,
        login: async (
          params: LoginRequest
        ): Promise<{ accessToken: string }> => {
          set({ error: null });

          const { email, password } = params;
          try {
            const response = await AuthService.login(email, password);
            if (response.token && response.user_name && response.user_id) {
              set({ 
                isAuthenticated: true, 
                token: response.token, 
                userId: response.user_id,
                userName: response.user_name,
                lastName: response.last_name,
                email: response.email,
                avatar: response.avatar,
              });
              return { accessToken: response.token };
            } else {
              throw new Error("Token or user name not received");
            }
          } catch (e) {
            if (e instanceof Error) {
              set({ error: e.message });
            }
            throw e;
          }
        },
      
        signUp: async (params: SignUpRequest) => {
          try {
            const response: SignUpResponse  = await AuthService.signUp(params);
            if (response.token && response.user_name && response.user_id) {
              set({ 
                isAuthenticated: true, 
                token: response.token, 
                userId: response.user_id,
                userName: response.user_name,
                lastName: response.last_name,
                email: response.email,
                avatar: response.avatar,
              });
              return { accessToken: response.token };
            }
          } catch (e) {
            if (e instanceof Error) {
              set({ error: e.message });
            }
          }
        },
        
        logout: async () => {
          await AuthService.logout();
          set({ 
            isAuthenticated: false, 
            token: null, 
            userId: null,
            userName: null,
            lastName: null,
            avatar: null,
            email: null,
          });
          localStorage.clear();
        },
        setRememberedEmail: (email: string | null) =>
          set({ rememberedEmail: email }),
        getRememberedEmail: () => get().rememberedEmail,
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
