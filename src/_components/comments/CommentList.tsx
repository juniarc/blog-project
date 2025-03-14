import { Comment } from "@/types/types";
import CommentItem from "./CommentItem";
import CommentItemLoading from "../loadings/CommentItemLoading";

interface CommentListProps {
  comments: Comment[] | undefined;
  isLoading: boolean;
}

export default function CommentList({ comments, isLoading }: CommentListProps) {
  return (
    <div className="mt-5">
      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <CommentItemLoading key={index} />
        ))
      ) : comments?.length === 0 ? (
        <p className="text-sm md:text-base text-center mt-20">
          No comments yet
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {comments?.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </div>
      )}
    </div>
  );
}
