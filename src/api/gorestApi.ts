import { BlogBodyRequest, UserBodyRequest } from "@/types/types";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";

export const fetchBlogs = async (
  page: number = 1,
  title?: string,
  body?: string
) => {
  const { data, headers } = await axiosInstance.get("/posts", {
    params: {
      title,
      body,
      page,
      per_page: 5,
    },
  });

  return {
    blogs: data,
    totalItems: Number(headers["x-pagination-total"]),
    totalPages: Number(headers["x-pagination-pages"]),
  };
};

export const fetchUserBlogs = async (page: number = 1, userId: number) => {
  const { data, headers } = await axiosInstance.get(`/users/${userId}/posts`, {
    params: {
      page,
      per_page: 5,
    },
  });

  return {
    blogs: data,
    totalItems: Number(headers["x-pagination-total"]),
    totalPages: Number(headers["x-pagination-pages"]),
  };
};

export const fetchBlogById = async (id: number) => {
  console.log(id);
  const { data } = await axiosInstance.get(`/posts/${id}`);

  return data;
};

export const createBlog = async (body: BlogBodyRequest) => {
  try {
    const { data } = await axiosInstance.post(
      `/users/${body.user_id}/posts`,
      body
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
      throw axiosError.response.data;
    }

    throw new Error("Failed to create blog");
  }
};

export const createUser = async (body: UserBodyRequest) => {
  try {
    const { data } = await axiosInstance.post("/users", body);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
      throw axiosError.response.data;
    }

    throw new Error("Failed to create user");
  }
};

export const editUser = async (body: UserBodyRequest, id: number) => {
  try {
    const { data } = await axiosInstance.put(`/users/${id}`, body);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.data) {
      throw axiosError.response.data;
    }

    throw new Error("Failed to create user");
  }
};

export const fetchUsers = async () => {
  const { data } = await axiosInstance.get("/users");

  return data;
};

export const fetchUserById = async (id: number) => {
  const { data } = await axiosInstance.get(`/users/${id}`);

  return data;
};
