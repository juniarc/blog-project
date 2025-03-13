import { createUser } from "@/api/gorestApi";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      setCookie("userId", newUser.id, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
      });
    },
  });
};
