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

export const login = async (credentials: Credentials): Promise<User> => {
  try {
    const response = await axios.post<User>("/auth/signin", credentials);
    const { access_token } = response.data;
    // Store token in localStorage
    localStorage.setItem("token", access_token);

    return response.data;
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
    const response = await axios.post<User>("/auth/signup", userData);
    const { access_token } = response.data;
    localStorage.setItem("token", access_token);
    return response.data;
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
  router.push("/login");
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
