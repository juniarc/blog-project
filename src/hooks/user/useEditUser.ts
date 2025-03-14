import { editUser } from "@/api/gorestApi";
import { UserBodyRequest } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export const useEditUser = () => {
  return useMutation({
    mutationFn: ({ body, id }: { body: UserBodyRequest; id: number }) =>
      editUser(body, id),
  });
};
