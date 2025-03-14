import FailAlert from "@/_components/alerts/FailAlert";
import SuccessAlert from "@/_components/alerts/SuccesAlert";
import ColoredButton from "@/_components/buttons/ColoredButton";
import NavigationModal from "@/_components/modals/NavigationModal";
import { BlogBodyRequest } from "@/types/types";
import { Form, Input, Spin } from "antd";
import { FormProps } from "antd";
import TextArea from "antd/es/input/TextArea";
// import AlertRenderer from "../alerts/AlertRenderer";

type FieldType = BlogBodyRequest;

interface BlogFormProps {
  initialValues?: Partial<FieldType>;
  submitText?: string;
  onFinishHandler?: (values: FieldType) => void;
  isRequired?: boolean;
  isSuccess: boolean;
  isError: boolean;
  isPending: boolean;
  error: unknown;
  className?: string;
  openAlert: boolean;
  succesMessage: string;
  failedMessaged: string;
  isModalOpen?: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

export default function BlogForm({
  initialValues,
  submitText = "Submit",
  onFinishHandler,
  isSuccess,
  isError,
  isPending,
  error,
  className = "w-1/2",
  openAlert,
  isRequired = true,
  succesMessage,
  failedMessaged,
  isModalOpen,
  handleCloseModal,
  handleOpenModal,
}: BlogFormProps) {
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const renderAlert = () => {
    if (!openAlert) return null;

    if (isError) {
      return (
        <FailAlert
          message={
            error?.[0]?.message
              ? `${error?.[0]?.field + " " + error?.[0]?.message}`
              : failedMessaged
          }
        />
      );
    }

    if (isSuccess) {
      return <SuccessAlert message={succesMessage} />;
    }

    return null;
  };

  return (
    <div className="w-full sm:flex justify-center mt-5 lg:mt-10">
      <div className={className}>
        <Form
          name="basic"
          layout="vertical"
          initialValues={initialValues}
          onFinish={onFinishHandler}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Title"
            name="title"
            rules={[
              { required: isRequired, message: "Please input your name!" },
            ]}
          >
            <Input maxLength={50} showCount />
          </Form.Item>

          <Form.Item<FieldType>
            label="Body"
            name="body"
            rules={[
              { required: isRequired, message: "Please input your content!" },
            ]}
          >
            <TextArea className="h-96" rows={4} maxLength={500} showCount />
          </Form.Item>

          <div className="w-full flex justify-center mb-3">
            <ColoredButton
              className={`${
                isPending ? "bg-gray-200! border-0!" : ""
              } w-full lg:w-1/3 mt-5`}
              text={isPending ? <Spin /> : submitText}
              htmlType="submit"
              disabled={isPending}
            />
          </div>
        </Form>
        {isModalOpen && (
          <NavigationModal
            isModalOpen={isModalOpen}
            handleOK={handleOpenModal}
            handleCancel={handleCloseModal}
          />
        )}
        {/* <AlertRenderer
          openAlert={openAlert}
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          failedMessage={failedMessaged}
          successMessage={succesMessage}
        /> */}
        {renderAlert()}
      </div>
    </div>
  );
}
