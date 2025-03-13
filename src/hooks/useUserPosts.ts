import { useQuery } from "@tanstack/react-query";
import { fetchUserPosts } from "@/api/gorestApi";

export const useUserPosts = (page: number, userId: number) => {
  return useQuery({
    queryKey: ["post", userId, page],
    queryFn: () => fetchUserPosts(page, userId),
  });
};
