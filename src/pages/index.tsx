import HorizontalDivider from "@/_components/dividers/HorizontalDivider";
import HeroSection from "@/_containers/home/hero/HeroSection";
import PostList from "@/_components/posts/PostList";
import { GetServerSideProps } from "next";
import { fetchPosts } from "@/api/gorestApi";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { usePosts } from "@/hooks/usePosts";
import { useRouter } from "next/router";
import NavigationButton from "@/_components/buttons/NavigationButton";
import SearchSection from "@/_containers/home/search-section/SearchSection";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const page = Number(context.query.page) || 1;
  const title = context.query.title?.toString() || undefined;
  const body = context.query.body?.toString() || undefined;

  await queryClient.prefetchQuery({
    queryKey: ["posts", title ?? null, body ?? null, page],
    queryFn: () => fetchPosts(page, title, body),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const title = router.query.title?.toString() || undefined;
  const body = router.query.body?.toString() || undefined;
  const { data, isLoading } = usePosts(page, title, body);

  return (
    <main className="px-4 md:px-5 lg:px-20 min-h-screen">
      <HeroSection />
      <HorizontalDivider className="mt-8 lg:mt-10" />
      <div className="mt-8 lg:mt-0 lg:flex lg:justify-between">
        <div className="lg:pt-10 lg:pr-10 lg:border-e lg:border-e-black lg:w-1/3 lg:min-h-screen">
          <NavigationButton
            text="Create Blog"
            href="/create-post"
            className="w-full"
          />
          <SearchSection />
        </div>
        <HorizontalDivider className="mt-8 lg:hidden" />
        <div className="mt-8 lg:mt-0 lg:w-2/3 lg:p-10">
          <h2 id="postlistTitle" className="font-bold text-3xl lg:text-5xl">
            Blogs <span className="text-base">({data?.totalItems} posts)</span>
          </h2>
          <PostList
            posts={data?.posts || []}
            totalItems={data?.totalItems || 0}
            initialPage={page}
            isLoading={isLoading}
            title={title}
            body={body}
          />
        </div>
      </div>
    </main>
  );
}
