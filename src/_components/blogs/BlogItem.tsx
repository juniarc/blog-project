import { Blog } from "@/types/types";
import { useRouter } from "next/router";
import Additional from "./additional/Additional";

interface BlogItemProps extends Blog {
  additionalChildren?: boolean;
}

export default function BlogItem({
  id,
  user_id,
  title,
  body,
  additionalChildren,
}: BlogItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blogs/${id}`);
  };
  return (
    <div className="w-full min-h-44 p-5 lg:p-10 border border-gray-200 rounded-lg group hover:border-black transition ease-in-out duration-300">
      <p className="font-bold text-xl lg:text-4xl line-clamp-2 capitalize">
        {title}
      </p>
      <div className="mt-3">
        <p className="text-gray-400 text-xs lg:text-base line-clamp-3 text-justify group-hover:text-black transition ease-in-out duration-300">
          {body}
        </p>
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={handleClick}
            className="text-black text-xs lg:text-base font-semibold bg-white cursor-pointer hover:underline transition"
          >
            Show more
          </button>
          {additionalChildren && (
            <Additional blog={{ id, user_id, body, title }} />
          )}
        </div>
      </div>
    </div>
  );
}
