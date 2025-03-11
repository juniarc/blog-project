import PostItem from "./PostItem";

export default function PostList() {
  return (
    <div className="mt-5 lg:mt-10 flex flex-col gap-4">
      <PostItem />
      <PostItem />
    </div>
  );
}
