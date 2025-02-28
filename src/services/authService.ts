import { useRouter } from "next/navigation";
import axios from "./axiosInstance";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { User } from "../interfaces/user.interface";

interface Credentials {
  email: string;
  password: string;
}
interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface AuthResponse { data: User, access_token: string }
export const login = async (
  credentials: Credentials,
  rememberMe: boolean
): Promise<string> => {
  try {
    const response = await axios.post<AuthResponse>("/auth/signin", { ...credentials, rememberMe }) as { data: AuthResponse };
    const { access_token } = response.data;

    localStorage.setItem("token", access_token);
    return access_token;
  } catch (error: any) {
    if (typeof error.response.data?.message === "object")
      throw new Error(
        error.response.data?.message?.join(",") || "Login failed"
      );
    throw new Error(error.response.data?.message);
  }
};

export const signup = async (userData: SignUp): Promise<User> => {
  try {
    const response = await axios.post("/auth/signup", userData) as { data: AuthResponse };
    const { access_token } = response.data;
    localStorage.setItem("token", access_token);
    return response.data.data;
  } catch (error: any) {
    if (typeof error.response.data?.message === "object")
      throw new Error(
        error.response.data?.message?.join(",") || "Signup failed"
      );
    throw new Error(error.response.data?.message);
  }
};

export const logout = (router: AppRouterInstance) => {
  localStorage.removeItem("token");
  localStorage.removeItem("time");
  router.push("/auth/login");
  // Optionally redirect the user to the login page
};

export const me = async (): Promise<User> => {
  try {
    const response = await axios.get<User>("/auth/me");
    return response.data;
  } catch (error: any) {
    if (typeof error.response.data?.message === "object")
      throw new Error(error.response.data?.message.join(","));
  }
  throw new Error("Signup failed");
};
