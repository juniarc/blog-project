import { fetchUserById } from "@/api/gorestApi";
import { useQuery } from "@tanstack/react-query";

export const useUserDetail = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
};
