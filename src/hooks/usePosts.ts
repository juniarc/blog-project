import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/api/gorestApi";

export const usePosts = (page: number) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
  });
};
