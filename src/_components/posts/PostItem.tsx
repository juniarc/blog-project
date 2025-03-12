import { PostItemProps } from "@/types/types";

export default function PostItem({ id, user_id, title, body }: PostItemProps) {
  return (
    <div className="w-full min-h-44 p-5 lg:p-10 border border-gray-200 rounded-lg cursor-pointer group hover:border-black transition ease-in-out duration-300">
      <p className="font-bold text-xl lg:text-4xl line-clamp-2">{title}</p>
      <div className="mt-3">
        <p className="text-gray-400 text-xs lg:text-base line-clamp-3 text-justify group-hover:text-black transition ease-in-out duration-300">
          {body}
        </p>
        <button className="text-black text-xs lg:text-base font-semibold mt-3 bg-white">
          Show more
        </button>
      </div>
    </div>
  );
}
