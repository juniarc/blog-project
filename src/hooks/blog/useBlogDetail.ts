import { fetchBlogById } from "@/api/gorestApi";
import { useQuery } from "@tanstack/react-query";

export const useBlogDetail = (id: number) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
  });
};
