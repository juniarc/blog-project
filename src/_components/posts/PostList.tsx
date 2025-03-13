import PaginationButton from "../buttons/PaginationButton";
import PostItemLoading from "../loadings/PostItemLoading";
import PostItem from "./PostItem";
import { PostItemProps } from "@/types/types";

export interface PostListProps {
  posts: PostItemProps[];
  totalItems: number;
  pageSize?: number;
  initialPage: number;
  isLoading: boolean;
  title?: string;
  body?: string;
}

export default function PostList({
  posts,
  totalItems,
  pageSize,
  initialPage,
  isLoading,
  title,
  body,
}: PostListProps) {
  return (
    <div className="mt-5 lg:mt-10 h-full">
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
        totalItems={totalItems}
        pageSize={pageSize}
        initialPage={initialPage}
        title={title}
        body={body}
      />
    </div>
  );
}
