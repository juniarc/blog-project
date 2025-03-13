import { PostItemProps } from "@/types/types";
import { useRouter } from "next/router";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PostItem({ id, user_id, title, body }: PostItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${id}`);
  };
  return (
    <div className="w-full min-h-44 p-5 lg:p-10 border border-gray-200 rounded-lg group hover:border-black transition ease-in-out duration-300">
      <p className="font-bold text-xl lg:text-4xl line-clamp-2">{title}</p>
      <div className="mt-3">
        <p className="text-gray-400 text-xs lg:text-base line-clamp-3 text-justify group-hover:text-black transition ease-in-out duration-300">
          {body}
        </p>
        <button
          onClick={handleClick}
          className="text-black text-xs lg:text-base font-semibold mt-3 bg-white cursor-pointer hover:underline trasnition"
        >
          Show more
        </button>
      </div>
    </div>
  );
}
