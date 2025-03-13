import { useQuery } from "@tanstack/react-query";
import { fetchUserBlogs } from "@/api/gorestApi";

export const useUserBlogs = (page: number, userId: number) => {
  return useQuery({
    queryKey: ["blogs", userId, page],
    queryFn: () => fetchUserBlogs(page, userId),
  });
};
