import { createBlog } from "@/api/gorestApi";
import { useMutation } from "@tanstack/react-query";

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: createBlog,
  });
};
