import AlertRenderer from "@/_components/alerts/AlertRenderer";
import CommentList from "@/_components/comments/CommentList";
import NavigationModal from "@/_components/modals/NavigationModal";
import { useAddBlogComment } from "@/hooks/useAddBlogComment";
import { Blog, Comments, User } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CommentForm, { FieldType } from "./CommentForm";

interface CommentsContainerProps extends User {
  comments: Comments[] | undefined;
  blog_id: Blog["id"];
  isCommentsLoading: boolean;
}

export default function CommentsContainer({
  id,
  name,
  email,
  comments,
  blog_id,
  isCommentsLoading,
}: CommentsContainerProps) {
  const queryClient = useQueryClient();

  const { isSuccess, isError, isPending, mutate, error } = useAddBlogComment();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleComment = (values: FieldType) => {
    const body = {
      name: name,
      email: email,
      body: values.body,
    };

    if (!id) {
      setIsModalOpen(true);
    } else {
      mutate(
        { body: body, id: blog_id },
        {
          onSuccess: () => {
            setOpenAlert(true);
            queryClient.invalidateQueries({ queryKey: ["comments", blog_id] });
            setTimeout(() => setOpenAlert(false), 3000);
          },
          onError: () => {
            setOpenAlert(true);
            setTimeout(() => setOpenAlert(false), 3000);
          },
        }
      );
    }
  };

  return (
    <section className="mt-10">
      <div>
        <p className="text-sm md:text-base">
          Comments ({comments?.length ?? 0})
        </p>
      </div>
      <div className="mt-5">
        <div>
          <CommentForm handleComment={handleComment} isPending={isPending} />
          <div className="mt-3">
            <AlertRenderer
              openAlert={openAlert}
              isError={isError}
              isSuccess={isSuccess}
              error={error}
              failedMessage="Failed to add comment"
              successMessage="Comment added successfully"
            />
          </div>
        </div>
        {isModalOpen && (
          <NavigationModal
            isModalOpen={isModalOpen}
            handleCancel={() => setIsModalOpen(false)}
            handleOK={() => setIsModalOpen(false)}
          />
        )}
        <CommentList comments={comments} isLoading={isCommentsLoading} />
      </div>
    </section>
  );
}
