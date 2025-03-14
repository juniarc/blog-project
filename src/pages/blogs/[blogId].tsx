import NotFound from "@/_containers/not-found.tsx/NotFound";
import AuthorName from "@/_containers/blog/AuthorName";
import BlogContent from "@/_containers/blog/BlogContent";
import NavTrail from "@/_containers/blog/NavTrail";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import {
  fetchBlogById,
  fetchBlogComments,
  fetchUserById,
} from "@/api/gorestApi";
import { useBlogDetail } from "@/hooks/blog/useBlogDetail";
import { useUserDetail } from "@/hooks/user/useUserDetail";
import { useGetBlogComments } from "@/hooks/blog/useGetBlogComments";
import { getLastPathSegment } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();

  const id = context.params?.blogId;
  const userId = Number(getCookie("userId"));

  await Promise.all([
    await queryClient.fetchQuery({
      queryKey: ["blog", Number(id)],
      queryFn: () => fetchBlogById(Number(id)),
    }),
    await queryClient.fetchQuery({
      queryKey: ["comments", Number(id)],
      queryFn: () => fetchBlogComments(Number(id)),
    }),
  ]);

  if (userId) {
    await queryClient.prefetchQuery({
      queryKey: ["user", userId],
      queryFn: () => fetchUserById(userId),
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function BlogDetail() {
  const userId = Number(getCookie("userId"));
  const router = useRouter();

  const id = getLastPathSegment(router);

  const { data, isError, isLoading } = useBlogDetail(Number(id));
  const { data: commentsData, isLoading: isCommentsLoading } =
    useGetBlogComments(Number(id));

  const { data: userData } = useUserDetail(userId);

  if (isError) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <NotFound text="Oops! We couldn't find that blog." />
      </div>
    );
  }

  return (
    <main className="px-4 md:px-5 lg:px-20 min-h-screen">
      <div className="my-5">
        <NavTrail isLoading={isLoading} title={data?.title} />
        <div className="w-full mt-10 lg:mt-20 lg:flex lg:gap-10">
          <AuthorName isLoading={isLoading} user_id={data?.user_id} />
          <BlogContent
            isLoading={isLoading}
            {...data}
            user={userData}
            comments={commentsData || []}
            isCommentsLoading={isCommentsLoading}
          />
        </div>
      </div>
    </main>
  );
}
