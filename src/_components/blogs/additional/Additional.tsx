import ConfirmationModal from "@/_components/modals/ConfirmationModal";
import BlogForm from "@/_components/forms/BlogForm";
import { useEditBlog } from "@/hooks/useEditBlog";
import { BlogBodyRequest, Blog, GetBlogsResponse } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Spin } from "antd";
import { useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useDeleteBlog } from "@/hooks/useDeleteBlog";
import { useRouter } from "next/router";

export default function Additional({ blog }: { blog: Blog }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const page = Number(router.query.page) || 0;

  const { mutate: mutateBlog, isPending: isPendingBlog } = useDeleteBlog();
  const [openAlert, setOpenAlert] = useState(false);
  const [isDeleteOpen, setDeleteModal] = useState(false);

  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleCancelDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleDelete = () => {
    mutateBlog(
      { id: blog.id },
      {
        onSuccess: () => {
          setOpenAlert(true);
          queryClient.invalidateQueries({
            queryKey: ["blogs", blog.user_id, page],
          });

          setTimeout(() => setDeleteModal(false), 2000);
        },
        onError: () => {
          setOpenAlert(true);
          setTimeout(() => setOpenAlert(false), 3000);
        },
      }
    );
  };

  const { mutate, isPending, error, isSuccess, isError } = useEditBlog();
  const [isEditOpen, setEditOpen] = useState(false);

  const handleOpenEditModal = () => {
    setEditOpen(true);
  };

  const handleFinish = (values: BlogBodyRequest) => {
    mutate(
      { body: values, id: blog.id },
      {
        onSuccess: () => {
          setOpenAlert(true);
          queryClient.invalidateQueries({ queryKey: ["blogs", blog.user_id] });
          setTimeout(() => setOpenAlert(false), 3000);
        },
        onError: () => {
          setOpenAlert(true);
          setTimeout(() => setOpenAlert(false), 3000);
        },
      }
    );
  };

  return (
    <div className="flex">
      <div className="mr-3">
        <Button
          onClick={handleOpenEditModal}
          type="primary"
          icon={<BiPencil />}
          size="large"
        />
        <Modal
          title="Edit Profile"
          open={isEditOpen}
          onCancel={() => setEditOpen(false)}
          cancelButtonProps={{ hidden: true }}
          okButtonProps={{ hidden: true }}
          centered
          destroyOnClose
        >
          <BlogForm
            className="w-full"
            openAlert={openAlert}
            isPending={isPending}
            error={error}
            initialValues={blog}
            isError={isError}
            isSuccess={isSuccess}
            onFinishHandler={handleFinish}
            submitText="Update Profile"
            isRequired={false}
            succesMessage="Succesfuyl edit profile"
            failedMessaged="Failed edit profle"
            handleCloseModal={() => {}}
            handleOpenModal={() => {}}
          />
        </Modal>
      </div>
      <div>
        <Button
          type="default"
          danger
          icon={<BiTrash />}
          size="large"
          onClick={handleOpenDeleteModal}
        />
        <ConfirmationModal
          handleCancel={handleCancelDeleteModal}
          isModalOpen={isDeleteOpen}
          title="Delete Blog"
          content="Are you sure want to delete this blog ?"
          footer={
            <div>
              <Button
                onClick={handleCancelDeleteModal}
                className="mr-3"
                disabled={isPendingBlog}
              >
                Cancel
              </Button>
              <Button onClick={handleDelete} danger disabled={isPendingBlog}>
                {isPendingBlog ? <Spin /> : "Delete"}
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
}
