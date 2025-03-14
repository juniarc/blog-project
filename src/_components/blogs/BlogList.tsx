import PaginationButton from "../buttons/PaginationButton";
import BlogItemLoading from "../loadings/BlogItemLoading";
import BlogItem from "./BlogItem";
import { Blog } from "@/types/types";

export interface BlogListProps {
  blogs: Blog[] | undefined;
  totalItems: number;
  pageSize?: number;
  initialPage: number;
  isLoading: boolean;
  otherLoading?: boolean;
  titleQuery?: string;
  bodyQuery?: string;
  additionalChildren?: boolean;
}

export default function BlogList({
  blogs,
  totalItems,
  pageSize,
  initialPage,
  isLoading,
  otherLoading = false,
  titleQuery,
  bodyQuery,
  additionalChildren,
}: BlogListProps) {
  return (
    <div className="mt-5 lg:mt-10 h-full">
      {isLoading || otherLoading ? (
        Array.from({ length: pageSize ?? 5 }).map((_, index) => (
          <BlogItemLoading key={index} />
        ))
      ) : (
        <div className="flex flex-col gap-4">
          {blogs?.map((blog) => (
            <BlogItem
              key={blog.id}
              {...blog}
              additionalChildren={additionalChildren}
            />
          ))}
        </div>
      )}
      <PaginationButton
        totalItems={totalItems}
        pageSize={pageSize}
        initialPage={initialPage}
        title={titleQuery}
        body={bodyQuery}
      />
    </div>
  );
}
