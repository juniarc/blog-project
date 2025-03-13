import { createUser } from "@/api/gorestApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      localStorage.setItem("userId", newUser.id.toString());
    },
  });
};
