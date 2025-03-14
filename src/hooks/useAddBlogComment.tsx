import { addBlogComment } from "@/api/gorestApi";
import { CommentBodyRequest } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

export const useAddBlogComment = () => {
  return useMutation({
    mutationFn: ({ body, id }: { body: CommentBodyRequest; id: number }) =>
      addBlogComment(body, id),
  });
};
