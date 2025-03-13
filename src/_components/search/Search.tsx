import { SearchOutlined } from "@ant-design/icons";

export default function Search() {
  return (
    <div className="w-full h-10 bg-gray-200 rounded-md mt-3 flex items-center justify-between px-4 gap-5">
      <input
        type="text"
        name="searchInput"
        id="searchInput"
        placeholder="Search"
        className="text-sm w-full focus:outline-0"
      />
      <SearchOutlined />
    </div>
  );
}
