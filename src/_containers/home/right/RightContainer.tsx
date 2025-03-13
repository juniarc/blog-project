import BlogList from "@/_components/blogs/BlogList";
import { GetBlogsResponse } from "@/types/types";

export default function RightContainer({
  initialPage,
  title,
  body,
  data,
  isLoading,
}: {
  initialPage: number;
  title: string | undefined;
  body: string | undefined;
  data: GetBlogsResponse | undefined;
  isLoading: boolean;
}) {
  return (
    <div className="mt-8 lg:mt-0 lg:w-2/3 lg:p-10">
      <h2 id="bloglistTitle" className="font-bold text-3xl lg:text-5xl">
        Blogs <span className="text-base">({data?.totalItems} blogs)</span>
      </h2>
      <BlogList
        blogs={data?.blogs || []}
        totalItems={data?.totalItems || 0}
        initialPage={initialPage}
        isLoading={isLoading}
        title={title}
        body={body}
      />
    </div>
  );
}
