import FailAlert from "@/_components/alerts/FailAlert";
import SuccessAlert from "@/_components/alerts/SuccesAlert";
import ColoredButton from "@/_components/buttons/ColoredButton";
import { UserBodyRequest } from "@/types/types";
import { Form, Input, Select, Spin } from "antd";
import { FormProps } from "antd";

type FieldType = UserBodyRequest;

interface UserFormProps {
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
}

export default function UserForm({
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
}: UserFormProps) {
  const { Option } = Select;

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
            label="Name"
            name="name"
            rules={[
              { required: isRequired, message: "Please input your name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            hasFeedback
            rules={[
              {
                required: isRequired,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              { required: isRequired, message: "Please select your gender!" },
            ]}
          >
            <Select placeholder="Please select a gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
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
        {renderAlert()}
      </div>
    </div>
  );
}
