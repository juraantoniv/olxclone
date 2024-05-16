import {
  CommonMessagesType,
  Conversation,
} from "../common/scrips/commonMessages";
import {
  ITokensForRefresh,
  ITokensPair,
  UserInfoType,
} from "../common/types/types";
import { FormTypeForChangePassword } from "../components/loginComponent/changePassword";
import { FormType } from "../components/loginComponent/loginComponentNew";
import { FormTypeCreateUserNew } from "../components/myAccountForm/createAccountNew";
import { instance } from "./interceptors/interceptors";

export const authService = {
  login: (user: FormType) =>
    instance.post<ITokensPair>("/auth/sign-in", {
      ...user,
      deviceId: "1",
    }),
  loginByGoogle: (clientId: string, token: string) =>
    instance.post<ITokensPair>("/auth/sign-in/google", {
      token,
      clientId,
      deviceId: "1",
    }),
  refresh: (refreshToken: string) =>
    instance.post<ITokensForRefresh>("/auth/refresh", {
      refresh_token: refreshToken,
    }),
  logOut: () => instance.post("auth/logout"),
  forgotPassword: (email: string) =>
    instance.post("auth/recovery_password", {
      email,
    }),
  changePassword: (data: FormTypeForChangePassword) =>
    instance.post("auth/change_password", {
      new_password: data.new_password1,
      old_password: data.old_password,
    }),
  recoveryPassword: (password: string, token: string) =>
    instance.post(`auth/confirm_password/${token}`, {
      new_password: password,
    }),
  createUser: (user: FormTypeCreateUserNew) =>
    instance.post(
      "auth/sign-up",
      {
        phone: user.phone,
        name: user.name,
        password: user.password,
        age: user.age,
        email: user.email,
        city: user.city,
        file: user.file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    ),
};

export const userService = {
  getAllUsers: () => instance.get<UserInfoType[]>("users"),
  sendMessage: (id: string, title: string) =>
    instance.post<void>(`users/send_message/${id}`, {
      massage: title,
    }),
  getById: (id: string | undefined) =>
    instance.get<UserInfoType>(`users/${id}`),
  getMessages: () => instance.post<Conversation[]>(`users/my_messages`),
  helpMessage: (message: string, subject: string) =>
    instance.post<string>(`users/user/help`, {
      message,
      subject,
    }),
  updateUserData: (user: any) =>
    instance.patch("users", {
      ...user,
    }),
};

export const adminService = {
  deleteUser: (id: string | undefined) =>
    instance.delete<void>(`admin/delete/${id}`),
};
