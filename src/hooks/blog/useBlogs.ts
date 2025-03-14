import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/api/gorestApi";

export const useBlogs = (page: number, title?: string, body?: string) => {
  return useQuery({
    queryKey: ["blogs", title ?? null, body ?? null, page],
    queryFn: () => fetchBlogs(page, title, body),
  });
};
