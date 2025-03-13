import { editUserBlog } from "@/api/gorestApi";
import { BlogBodyRequest } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export const useEditBlog = () => {
  return useMutation({
    mutationFn: ({ id, body }: { body: BlogBodyRequest; id: number }) =>
      editUserBlog(id, body),
  });
};
