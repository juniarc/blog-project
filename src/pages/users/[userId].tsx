import BreadcrumbNav from "@/_components/breadcrumbs/BreadcrumbNav";
import SingleLoading from "@/_components/loadings/SingleLoading";
import PostList from "@/_components/posts/PostList";
import NotFound from "@/_containers/not-found.tsx/NotFound";
import { fetchUserById, fetchUserPosts } from "@/api/gorestApi";
import { useUserDetail } from "@/hooks/useUserDetail";
import { useUserPosts } from "@/hooks/useUserPosts";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const id = Number(context.params?.userId);
  const page = Number(context.query.page) || 1;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["user", id],
      queryFn: () => fetchUserById(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ["post", id, page],
      queryFn: () => fetchUserPosts(page, id),
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function PostDetail() {
  const router = useRouter();

  const pathArray = router.asPath.split("/").filter((path) => path);
  const lastPath = pathArray[pathArray.length - 1];
  const id = decodeURIComponent(lastPath);

  const {
    data: user,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useUserDetail(Number(id));

  const page = Number(router.query.page) || 0;
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useUserPosts(page, Number(id));
  if (isUserError) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <NotFound text="Oops! We couldn't find that blog." />
      </div>
    );
  }

  return (
    <main className="px-4 md:px-5 lg:px-20 min-h-screen lg:h-auto">
      <div className="w-full lg:flex">
        <div className="lg:w-1/3 lg:h-screen lg:border-e lg:border-e-black lg:py-5 lg:pr-10 mt-5 lg:mt-0">
          {isUserLoading ? (
            <SingleLoading className="w-[70vw] md:w-96 h-5" />
          ) : (
            <BreadcrumbNav pathname={`users/${user.name}`} />
          )}
          <h2 className="font-bold text-3xl lg:text-5xl mt-5 lg:mt-10">
            User Detail
          </h2>

          <div className="w-full mt-5 lg:mt-5 flex flex-col gap-3">
            <div className="w-full flex">
              <p className="w-1/3 font-bold text-xs md:text-base">Name</p>
              {isUserLoading ? (
                <SingleLoading className="w-full lg:w-2/3 h-4" />
              ) : (
                <p className="capitalize w-2/3 break-words text-xs md:text-base">
                  {user.name}
                </p>
              )}
            </div>
            <div className="w-full flex text-wrap">
              <p className="w-1/3 font-bold text-xs md:text-base">Email</p>
              {isUserLoading ? (
                <SingleLoading className="w-full lg:w-2/3 h-4" />
              ) : (
                <p className="w-2/3 break-words text-xs md:text-base">
                  {user.email}
                </p>
              )}
            </div>
            <div className="w-full flex">
              <p className="w-1/3 font-bold text-xs md:text-base">Gender</p>
              {isUserLoading ? (
                <SingleLoading className="w-full lg:w-2/3 h-4" />
              ) : (
                <p className="capitalize text-xs md:text-base">{user.gender}</p>
              )}
            </div>
          </div>
        </div>
        <div className="py-5 lg:pl-10 mt-10 lg:mt-0 border-t border-t-black lg:border-0 lg:w-2/3">
          {isUserLoading ? (
            <>
              <SingleLoading className="w-full h-8 lg:mt-15" />
              <SingleLoading className="w-full h-8 mt-2" />
            </>
          ) : (
            <h2 className="font-bold text-3xl lg:text-5xl lg:mt-[62px]">
              {user.name}&apos;s Blog
            </h2>
          )}
          <div>
            {isPostError ? (
              <div className="flex items-center justify-center px-4 mt-20">
                <NotFound text="This user hasn’t posted anything yet." />
              </div>
            ) : (
              <PostList
                posts={post?.posts || []}
                totalPages={post?.totalPages || 0}
                initialPage={page}
                isLoading={isPostLoading}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
