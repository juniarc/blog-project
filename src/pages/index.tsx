import type { NextRouter } from "next/router";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchBlogs } from "@/api/gorestApi";
import { useBlogs } from "@/hooks/blog/useBlogs";

import HorizontalDivider from "@/_components/dividers/HorizontalDivider";
import HeroSection from "@/_containers/home/hero/HeroSection";
import ButtonsContainer from "@/_containers/home/buttons/ButtonsContainer";
import BlogsContainer from "@/_containers/home/blogs/BlogsContainer";

const getQueryParams = (context: GetServerSidePropsContext | NextRouter) => {
  const page = Number(context.query.page) || 1;
  const title = context.query.title?.toString() || undefined;
  const body = context.query.body?.toString() || undefined;

  return { page, title, body };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const { page, title, body } = getQueryParams(context);

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

  const { page, title, body } = getQueryParams(router);
  const { data, isLoading } = useBlogs(page, title, body);

  return (
    <main className="px-4 md:px-5 lg:px-20 min-h-screen">
      <HeroSection />
      <HorizontalDivider className="mt-8 lg:mt-10" />
      <div className="mt-8 lg:mt-0 lg:flex lg:justify-between">
        <ButtonsContainer />
        <HorizontalDivider className="mt-8 lg:hidden" />
        <BlogsContainer
          data={data}
          initialPage={page}
          isLoading={isLoading}
          titleQuery={title}
          bodyQuery={body}
        />
      </div>
    </main>
  );
}
