import FailAlert from "@/_components/alerts/FailAlert";
import SuccessAlert from "@/_components/alerts/SuccesAlert";
import ColoredButton from "@/_components/buttons/ColoredButton";
import NavigationModal from "@/_components/modals/NavigationModal";
import { useCreateBlog } from "@/hooks/useCreateBlog";
import { BlogBodyRequest } from "@/types/types";
import { Form, Input, Spin } from "antd";
import { FormProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type FieldType = BlogBodyRequest;

export default function FormSection() {
  const router = useRouter();
  const { isSuccess, isError, isPending, mutate, error } = useCreateBlog();

  const [openAlert, setOpenAlert] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const idFromStorage = Number(localStorage.getItem("userId")) || null;
    setUserId(idFromStorage);
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (userId !== null) {
      mutate(
        { ...values, user_id: userId },
        {
          onSuccess: () => {
            setOpenAlert(true);
            router.push("/");
          },
          onError: () => {
            setOpenAlert(true);
            setTimeout(() => setOpenAlert(false), 3000);
          },
        }
      );
    } else {
      showModal();
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full sm:flex justify-center mt-5 lg:mt-10">
      <div className="sm:w-1/2 ">
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input maxLength={50} showCount />
          </Form.Item>

          <Form.Item<FieldType>
            label="Body"
            name="body"
            rules={[{ required: true, message: "Please input your content!" }]}
          >
            <TextArea className="h-96" rows={4} maxLength={500} showCount />
          </Form.Item>

          <div className="w-full flex justify-center">
            <ColoredButton
              className={`${
                isPending ? "bg-gray-200! border-0!" : ""
              } w-full lg:w-1/3 mt-5`}
              text={isPending ? <Spin /> : "Submit"}
              htmlType="submit"
              disabled={isPending}
            />
          </div>
        </Form>
        {isModalOpen && (
          <NavigationModal
            isModalOpen={isModalOpen}
            handleOK={handleOk}
            handleCancel={handleCancel}
          />
        )}
        {openAlert && isError && (
          <div className="mt-5">
            <FailAlert
              message={
                error?.[0]?.message
                  ? `${error?.[0]?.field + " " + error?.[0]?.message}`
                  : "Failed to create blog"
              }
            />
          </div>
        )}
        {openAlert && isSuccess && (
          <div className="mt-5">
            <SuccessAlert message="Successfully create blog" />
          </div>
        )}
      </div>
    </div>
  );
}
