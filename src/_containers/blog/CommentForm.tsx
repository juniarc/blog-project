import { Button, Form, FormProps, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";

export interface FieldType {
  body: string;
}

export default function CommentForm({
  handleComment,
  isPending,
}: {
  handleComment: (values: FieldType) => void;
  isPending: boolean;
}) {
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={handleComment}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="body"
        rules={[{ required: true, message: "Please input your comment!" }]}
      >
        <TextArea
          placeholder="Write your comment here..."
          variant="underlined"
          autoSize={{ minRows: 2, maxRows: 5 }}
          maxLength={300}
          showCount
        />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        className="w-full lg:w-1/3 mt-5"
        disabled={isPending}
      >
        {isPending ? <Spin /> : "Add Comment"}
      </Button>
    </Form>
  );
}
