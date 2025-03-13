import NavigationButton from "@/_components/buttons/NavigationButton";
import SearchSection from "../search-section/SearchSection";

export default function LeftContainer() {
  return (
    <div className="lg:pt-10 lg:pr-10 lg:border-e lg:border-e-black lg:w-1/3 lg:min-h-screen">
      <NavigationButton
        text="Create Blog"
        href="/create-blog"
        className="w-full"
      />
      <SearchSection />
    </div>
  );
}
