export interface PostItemProps {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface UserBodyRequest {
  name: string;
  email: string;
  gender: "male" | "female";
  status: "active" | "inactive";
}

export interface PostBodyRequest {
  user_id: number | null;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: "active" | "inactive";
}
