import { deleteUserBlog } from "@/api/gorestApi";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBlog = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteUserBlog(id),
  });
};
