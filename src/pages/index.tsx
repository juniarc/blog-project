import ColoredButton from "@/_components/buttons/ColoredButton";
import HorizontalDivider from "@/_components/dividers/HorizontalDivider";
import HeroSection from "@/_containers/home/hero/HeroSection";
import Search from "@/_components/search/Search";
import PostList from "@/_components/posts/PostList";
export default function Home() {
  return (
    <main className="px-4 md:px-5 lg:px-20 min-h-screen">
      <HeroSection />
      <HorizontalDivider className="mt-8 lg:mt-10" />
      <div className="mt-8 lg:mt-0 lg:flex lg:justify-between">
        <div className="lg:pt-10 lg:pr-10 lg:border-e lg:border-e-black lg:w-1/3 lg:min-h-screen">
          <ColoredButton text="Create Blog" className="w-full" />
          <Search />
        </div>
        <HorizontalDivider className="mt-8 lg:hidden" />
        <div className="mt-8 lg:mt-0 lg:w-2/3 lg:p-10">
          <h2 className="font-bold text-3xl lg:text-5xl">Blogs</h2>
          <PostList />
        </div>
      </div>
    </main>
  );
}
