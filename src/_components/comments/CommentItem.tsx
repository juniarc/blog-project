import { Comments } from "@/types/types";

export default function CommentItem({ body, email, name }: Comments) {
  return (
    <div className="w-full min-h-28 lg:min-h-36 p-5 lg:p-5 border border-gray-200 rounded-lg group hover:border-black transition ease-in-out duration-300">
      <p className="font-bold md:text-xl capitalize">{name}</p>
      <p className="text-xs md:text-sm mt-1 text-gray-500">{email}</p>
      <p className="text-xs md:text-base mt-5">{body}</p>
    </div>
  );
}
