import { fetchPostById } from "@/api/gorestApi";
import { useQuery } from "@tanstack/react-query";

export const usePostDetail = (id: number) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
  });
};
