import PaginationButton from "../buttons/PaginationButton";
import PostItemLoading from "../loadings/PostItemLoading";
import PostItem from "./PostItem";
import { PostItemProps } from "@/types/types";

export interface PostListProps {
  posts: PostItemProps[];
  totalPages: number;
  pageSize?: number;
  initialPage: number;
  isLoading: boolean;
}

export default function PostList({
  posts,
  totalPages,
  pageSize,
  initialPage,
  isLoading,
}: PostListProps) {
  return (
    <div className="mt-5 lg:mt-10">
      {isLoading ? (
        Array.from({ length: pageSize ?? 5 }).map((_, index) => (
          <PostItemLoading key={index} />
        ))
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
        </div>
      )}
      <PaginationButton
        totalPages={totalPages}
        pageSize={pageSize}
        initialPage={initialPage}
      />
    </div>
  );
}
