import { useQuery } from "@tanstack/react-query";
import { fetchBlogComments } from "@/api/gorestApi";
import { Blog } from "@/types/types";

export const useGetBlogComments = (id: Blog["id"]) => {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchBlogComments(id),
  });
};
