import BreadcrumbNav from "@/_components/breadcrumbs/BreadcrumbNav";
import SingleLoading from "@/_components/loadings/SingleLoading";
import NotFound from "@/_containers/not-found.tsx/NotFound";
import { fetchPostById } from "@/api/gorestApi";
import { usePostDetail } from "@/hooks/usePostDetail";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const id = context.params?.postId;

  await queryClient.prefetchQuery({
    queryKey: ["post", Number(id)],
    queryFn: () => fetchPostById(Number(id)),
  });

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

  const { data, isError, isLoading } = usePostDetail(Number(id));
  if (isError) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <NotFound text="Oops! We couldn't find that blog." />
      </div>
    );
  }

  return (
    <main className="px-4 md:px-5 lg:px-20 min-h-screen">
      <div className="mt-5">
        {isLoading ? (
          <SingleLoading className="w-[70vw] md:w-96 h-5" />
        ) : (
          <BreadcrumbNav pathname={`posts/${data.title}`} />
        )}
        <div className="w-full mt-10 lg:mt-20 lg:flex lg:gap-10">
          <div className="flex text-sm">
            <span className="text-gray-500 text-nowrap">Posted By: &nbsp;</span>
            {isLoading ? (
              <SingleLoading className="w-14 h-5" />
            ) : (
              <Link
                href={`/users/${data.user_id}`}
                className="font-semibold underline text-nowrap"
              >
                {data.user_id}
              </Link>
            )}
          </div>
          <div className="w-full lg:w-auto mt-5 lg:mt-0">
            {isLoading ? (
              <>
                <SingleLoading className="lg:w-[70vw] h-10" />
                <SingleLoading className="lg:w-[70vw] h-4 md:h-5 mt-5 lg:mt-10" />
                <SingleLoading className="lg:w-[70vw] h-4 md:h-5 mt-1 md:mt-3" />
                <SingleLoading className="lg:w-[70vw] h-4 md:h-5 mt-1 md:mt-3 " />
              </>
            ) : (
              <>
                <h2 className="font-bold text-xl lg:text-4xl">{data.title}</h2>
                <p className="mt-5 lg:mt-10 text-sm lg:text-base text-justify">
                  {data.body}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
