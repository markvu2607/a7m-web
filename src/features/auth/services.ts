import pbClient from "@/lib/pb-client";

export const login = async (email: string, password: string) => {
  return await pbClient.collection("users").authWithPassword(email, password);
};

export const logout = async () => {
  return await pbClient.authStore.clear();
};

export const register = async (
  email: string,
  password: string,
  passwordConfirm: string,
  name: string
) => {
  await pbClient.collection("users").create({
    email,
    password,
    passwordConfirm,
    name,
  });
  return await login(email, password);
};
