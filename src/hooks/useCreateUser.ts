import { createUser } from "@/api/gorestApi";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  const { updateUser } = useAuth();
  return useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      updateUser(newUser.id);
    },
  });
};
