import axiosInstance from "./axiosInstance";

export const fetchPosts = async (page: number = 1) => {
  console.log(page, "fetchPosts");
  const { data, headers } = await axiosInstance.get("/posts", {
    params: {
      page,
      per_page: 5,
    },
  });

  return {
    posts: data,
    totalItems: Number(headers["x-pagination-total"]),
    totalPages: Number(headers["x-pagination-pages"]),
  };
};
