import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { fetchUserById, fetchUserBlogs } from "@/api/gorestApi";
import { useUserDetail } from "@/hooks/user/useUserDetail";
import { useUserBlogs } from "@/hooks/user/useUserBlogs";
import { getLastPathSegment } from "@/utils/utils";
import NotFound from "@/_containers/not-found.tsx/NotFound";
import BlogsContainer from "@/_containers/user/BlogsContainer";
import UserDetailContainer from "@/_containers/user/UserDetailContainer";
import NavTrail from "@/_containers/user/NavTrail";
import Head from "next/head";

const getQueryParams = (context: GetServerSidePropsContext) => {
  const id = Number(context.params?.userId);
  const page = Number(context.query.page) || 1;

  return { id, page };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const { id, page } = getQueryParams(context);

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["user", id],
      queryFn: () => fetchUserById(id),
    }),
    queryClient.prefetchQuery({
      queryKey: ["blogs", id, page],
      queryFn: () => fetchUserBlogs(page, id),
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function BlogDetail() {
  const router = useRouter();

  const id = getLastPathSegment(router);

  const {
    data: user,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useUserDetail(Number(id));

  const page = Number(router.query.page) || 0;
  const {
    data: blogs,
    isLoading: isBlogLoading,
    isError: isBlogError,
  } = useUserBlogs(page, Number(id));

  if (isUserError) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <NotFound text="Oops! We couldn't find the user." />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{user ? `${user?.name}'s Profile` : "Loading..."}</title>
        <meta
          name="description"
          content={user ? `${user?.name}'s Profile` : "Loading...."}
        />
      </Head>
      <main className="px-4 md:px-5 lg:px-20 min-h-screen lg:h-auto">
        <div className="w-full lg:flex">
          <div className="lg:w-1/3 lg:h-screen lg:border-e lg:border-e-black lg:py-5 lg:pr-10 mt-5 lg:mt-0">
            <NavTrail isUserLoading={isUserLoading} name={user?.name} />
            <UserDetailContainer {...user} isUserLoading={isUserLoading} />
          </div>
          <BlogsContainer
            name={user?.name}
            data={blogs}
            isBlogError={isBlogError}
            isBlogLoading={isBlogLoading}
            page={page}
            isUserLoading={isUserLoading}
          />
        </div>
      </main>
    </>
  );
}
