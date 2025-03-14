import SingleLoading from "@/_components/loadings/SingleLoading";
import { GetBlogsResponse } from "@/types/types";
import NotFound from "../not-found.tsx/NotFound";
import BlogList from "@/_components/blogs/BlogList";
import NavigationButton from "@/_components/buttons/NavigationButton";

export default function BlogsContainer({
  isUserLoading,
  data,
  isBlogError,
  page,
  isBlogLoading,
}: {
  isUserLoading: boolean;
  isBlogError: boolean;
  isBlogLoading: boolean;
  data: GetBlogsResponse | undefined;
  page: number;
}) {
  return (
    <div className="h-full py-5 lg:pl-10 mt-10 lg:mt-0 border-t border-t-black lg:border-0 lg:w-2/3">
      {isUserLoading ? (
        <>
          <SingleLoading className="w-full h-8 lg:mt-15" />
          <SingleLoading className="w-full h-8 mt-2" />
        </>
      ) : (
        <h2 className="font-bold text-3xl lg:text-5xl lg:mt-[62px] capitalize">
          Your Blogs
        </h2>
      )}
      <section>
        {isBlogError || data?.totalItems === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 mt-20">
            <NotFound text="You haven’t posted anything yet." />
            <NavigationButton
              text="Create Blog"
              href="/create-blog"
              className="mt-10 px-10"
            />
          </div>
        ) : (
          <BlogList
            blogs={data?.blogs || []}
            totalItems={data?.totalItems || 0}
            initialPage={page}
            isLoading={isBlogLoading}
            otherLoading={isUserLoading}
            additionalChildren={true}
          />
        )}
      </section>
    </div>
  );
}
