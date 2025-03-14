export default function CommentItemLoading() {
  return (
    <div className="w-full min-h-28 lg:min-h-36 p-5 lg:p-5 border border-gray-200 rounded-lg group hover:border-black transition ease-in-out duration-300">
      <div className="w-1/4 h-6 md:h-9 bg-gray-200 animate-pulse rounded md:rounded-lg"></div>
      <div className="mt-1 w-20 h-6 md:h-5 bg-gray-200 animate-pulse rounded md:rounded-lg"></div>
      <div className="mt-5 w-full h-6 bg-gray-200 animate-pulse rounded md:rounded-lg"></div>
      <div className="mt-2 w-1/2 h-6 bg-gray-200 animate-pulse rounded md:rounded-lg"></div>
    </div>
  );
}
