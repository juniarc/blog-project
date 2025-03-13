import OutlinedButton from "@/_components/buttons/OutlinedButton";
import { Modal } from "antd";
import { useState } from "react";
import { User, UserBodyRequest } from "@/types/types";
import { useEditUser } from "@/hooks/useEditUser";
import { useQueryClient } from "@tanstack/react-query";
import UserForm from "@/_components/forms/UserForm";

export default function EditProfileContainer({ user }: { user: User }) {
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const { mutate, isPending, error, isSuccess, isError } = useEditUser();

  const handelFinish = (values: UserBodyRequest) => {
    mutate(
      { body: { ...values, status: "active" }, id: user.id },
      {
        onSuccess: () => {
          setOpenAlert(true);
          queryClient.invalidateQueries({ queryKey: ["user", user.id] });
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
    <div className="flex justify-end lg:mt-5">
      <OutlinedButton
        text="Edit Profile"
        handleClick={() => setModalOpen(true)}
      />
      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        cancelButtonProps={{ hidden: true }}
        okButtonProps={{ hidden: true }}
        centered
        destroyOnClose
      >
        <UserForm
          className="w-full"
          openAlert={openAlert}
          isPending={isPending}
          error={error}
          initialValues={user}
          isError={isError}
          isSuccess={isSuccess}
          onFinishHandler={handelFinish}
          submitText="Update Profile"
          isRequired={false}
          succesMessage="Succesfuyl edit profile"
          failedMessaged="Failed edit profle"
        />
      </Modal>
    </div>
  );
}
