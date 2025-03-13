import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function Search({
  handleSearch,
}: {
  handleSearch: (input: string) => void;
}) {
  const [input, setInput] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(input);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-10 bg-gray-200 rounded-md mt-3 flex items-center justify-between px-4 gap-5"
    >
      <input
        type="text"
        value={input}
        name="searchInput"
        id="searchInput"
        placeholder="Search"
        className="text-sm w-full focus:outline-0"
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" aria-label="Submit search">
        <SearchOutlined />
      </button>
    </form>
  );
}
