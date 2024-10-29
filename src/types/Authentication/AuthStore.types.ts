import { LoginRequest, SignUpRequest } from "./AuthService.types";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
  rememberedEmail: string | null;
  userId: string  | null ;
  userName: string | null;
  lastName: string | null;
  email: string | null;
  avatar: string | null;
  login: (params: LoginRequest) => Promise<{ accessToken: string }>;
  signUp: (params: SignUpRequest) => Promise<{ accessToken: string } | undefined>;
  logout: () => void;
  getRememberedEmail: () => string | null;
  setRememberedEmail: (email: string | null) => void;
}
