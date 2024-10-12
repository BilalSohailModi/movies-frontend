import { atom } from "jotai";
import { User } from "../interfaces/user.interface";

export const userState = atom<User>();
