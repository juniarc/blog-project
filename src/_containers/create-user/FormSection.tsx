import FailAlert from "@/_components/alerts/FailAlert";
import SuccessAlert from "@/_components/alerts/SuccesAlert";
import ColoredButton from "@/_components/buttons/ColoredButton";
import { useCreateUser } from "@/hooks/useCreateUser";
import { UserBodyRequest } from "@/types/types";
import { Form, Input, Select, Spin } from "antd";
import { FormProps } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

type FieldType = UserBodyRequest;

export default function FormSection() {
  const router = useRouter();
  const { isSuccess, isError, isPending, mutate, error } = useCreateUser();
  const [openAlert, setOpenAlert] = useState(false);

  const { Option } = Select;
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(
      { ...values, status: "active" },
      {
        onSuccess: () => {
          setOpenAlert(true);
          router.back();
        },
        onError: () => {
          setOpenAlert(true);
          setTimeout(() => setOpenAlert(false), 3000);
        },
      }
    );
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
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
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
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
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Select placeholder="Please select a gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
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
        {openAlert && isError && (
          <div className="mt-5">
            <FailAlert
              message={
                error?.[0]?.message
                  ? `${error?.[0]?.field + " " + error?.[0]?.message}`
                  : "Failed to create user"
              }
            />
          </div>
        )}
        {openAlert && isSuccess && (
          <div className="mt-5">
            <SuccessAlert message="Successfully create user" />
          </div>
        )}
      </div>
    </div>
  );
}
