import Search from "@/_components/search/Search";
import { useRouter } from "next/router";

export default function SearchSection() {
  const router = useRouter();
  const handleSearchTitle = (value: string) => {
    router.push(`/?title=${value}`);
  };
  const handleSearchBody = (value: string) => {
    router.push(`/?body=${value}`);
  };
  return (
    <div className="mt-5">
      <div>
        <p className="text-center font-bold mb-1">Search by Title</p>
        <Search handleSearch={handleSearchTitle} />
      </div>
      <div className="mt-5">
        <p className="text-center font-bold mb-1">Search by Content</p>
        <Search handleSearch={handleSearchBody} />
      </div>
    </div>
  );
}
