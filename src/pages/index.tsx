import HorizontalDivider from "@/_components/dividers/HorizontalDivider";
import HeroSection from "@/_containers/home/hero/HeroSection";
import { GetServerSideProps } from "next";
import { fetchBlogs } from "@/api/gorestApi";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import LeftContainer from "@/_containers/home/left/LeftContainer";
import RightContainer from "@/_containers/home/right/RightContainer";
import { useBlogs } from "@/hooks/useBlogs";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const page = Number(context.query.page) || 1;
  const title = context.query.title?.toString() || undefined;
  const body = context.query.body?.toString() || undefined;

  await queryClient.prefetchQuery({
    queryKey: ["blogs", title ?? null, body ?? null, page],
    queryFn: () => fetchBlogs(page, title, body),
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

  const { data, isLoading } = useBlogs(page, title, body);

  return (
    <main className="px-4 md:px-5 lg:px-20 min-h-screen">
      <HeroSection />
      <HorizontalDivider className="mt-8 lg:mt-10" />
      <div className="mt-8 lg:mt-0 lg:flex lg:justify-between">
        <LeftContainer />
        <HorizontalDivider className="mt-8 lg:hidden" />
        <RightContainer
          data={data}
          initialPage={page}
          isLoading={isLoading}
          title={title}
          body={body}
        />
      </div>
    </main>
  );
}
