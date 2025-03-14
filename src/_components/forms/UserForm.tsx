import { UserBodyRequest } from "@/types/types";
import { Button, Form, Input, Select, Spin } from "antd";
import { FormProps } from "antd";
import AlertRenderer from "../alerts/AlertRenderer";

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
  successMessage: string;
  failedMessage: string;
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
  successMessage,
  failedMessage,
}: UserFormProps) {
  const { Option } = Select;

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
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
            <Button
              htmlType="submit"
              disabled={isPending}
              className="w-full lg:w-1/3 mt-5"
              type="primary"
            >
              {isPending ? <Spin /> : submitText}
            </Button>
          </div>
        </Form>
        <AlertRenderer
          openAlert={openAlert}
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          failedMessage={failedMessage}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
}
