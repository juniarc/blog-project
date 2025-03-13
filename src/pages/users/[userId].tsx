import NotFound from "@/_containers/not-found.tsx/NotFound";
import { fetchUserById, fetchUserBlogs } from "@/api/gorestApi";
import { useUserDetail } from "@/hooks/useUserDetail";
import { useUserBlogs } from "@/hooks/useUserBlogs";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import BlogsContainer from "@/_containers/user/BlogsContainer";
import UserDetailContainer from "@/_containers/user/UserDetailContainer";
import SingleLoading from "@/_components/loadings/SingleLoading";
import BreadcrumbNav from "@/_components/breadcrumbs/BreadcrumbNav";

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

  const pathArray = router.asPath.split("/").filter((path) => path);
  const lastPath = pathArray[pathArray.length - 1];
  const id = decodeURIComponent(lastPath);

  const {
    data: user,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useUserDetail(Number(id));

  console.log(user);

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
    <main className="px-4 md:px-5 lg:px-20 min-h-screen lg:h-auto">
      <div className="w-full lg:flex">
        <div className="lg:w-1/3 lg:h-screen lg:border-e lg:border-e-black lg:py-5 lg:pr-10 mt-5 lg:mt-0">
          {isUserLoading ? (
            <SingleLoading className="w-[70vw] md:w-96 h-5" />
          ) : (
            <BreadcrumbNav pathname={`users/${user.name}`} />
          )}
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
  );
}
