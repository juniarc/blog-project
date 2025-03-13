export interface Blog {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface BlogBodyRequest {
  user_id: number | null;
  title: string;
  body: string;
}

export interface GetBlogsResponse {
  blogs: Blog[];
  totalItems: number;
  totalPages: number;
}

export interface UserBodyRequest {
  name: string;
  email: string;
  gender: string;
  status: "active" | "inactive";
}

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: "active" | "inactive";
}
