import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/api/gorestApi";

export const usePosts = (page: number, title?: string, body?: string) => {
  return useQuery({
    queryKey: ["posts", title ?? null, body ?? null, page],
    queryFn: () => fetchPosts(page, title, body),
  });
};
