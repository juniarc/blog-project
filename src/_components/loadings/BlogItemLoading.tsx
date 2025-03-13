export default function BlogItemLoading() {
  return (
    <div className="w-full md:h-72 p-5 lg:p-10 border border-gray-200 rounded-lg cursor-pointer group hover:border-black transition ease-in-out duration-300">
      <div className="w-full h-6 md:h-9 bg-gray-200 animate-pulse rounded md:rounded-lg"></div>
      <div className="w-full h-6 md:h-9 bg-gray-200 animate-pulse rounded md:rounded-lg mt-1 md:mt-2"></div>
      <div className="w-full h-4 md:h-5 mt-1 md:mt-3 bg-gray-200 animate-pulse rounded md:rounded-lg"></div>
      <div className="w-full h-4 md:h-5 mt-1 md:mt-3 bg-gray-200 animate-pulse rounded md:rounded-lg"></div>
      <div className="w-1/3 h-4 md:h-5 mt-1 md:mt-3 bg-gray-200 animate-pulse rounded md:rounded-lg"></div>
      <div className="w-20 h-4 md:h-5 mt-1 md:mt-3 bg-gray-200 animate-pulse rounded md:rounded-lg"></div>
    </div>
  );
}
