import SingleLoading from "@/_components/loadings/SingleLoading";
import Link from "next/link";

export default function AuthorName({
  isLoading,
  user_id,
}: {
  isLoading: boolean;
  user_id: number;
}) {
  return (
    <div className="flex text-sm">
      <span className="text-gray-500 text-nowrap">Posted By: &nbsp;</span>
      {isLoading ? (
        <SingleLoading className="w-14 h-5" />
      ) : (
        <Link
          href={`/users/${user_id}`}
          className="font-semibold underline text-nowrap"
        >
          {user_id}
        </Link>
      )}
    </div>
  );
}
