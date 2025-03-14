import { Button, Modal } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { User, UserBodyRequest } from "@/types/types";
import { useEditUser } from "@/hooks/useEditUser";
import { useAuth } from "@/providers/AuthProvider";
import UserForm from "@/_components/forms/UserForm";
import OutlinedButton from "@/_components/buttons/OutlinedButton";

export default function EditProfileContainer({ user }: { user: User }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isModalOpen, setModalOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const { mutate, isPending, error, isSuccess, isError } = useEditUser();
  const { deleteUser } = useAuth();

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

  const handleLogout = () => {
    deleteUser();
    router.push("/");
  };

  return (
    <div className="flex justify-end mt-5 lg:mt-10 gap-5">
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
          successMessage="Succesfully edit profile"
          failedMessage="Failed edit profle"
        />
      </Modal>
      <Button onClick={handleLogout} danger>
        Logout
      </Button>
    </div>
  );
}
