import { Button } from "antd";

export default function ColoredButton({
  className,
  text,
  htmlType,
  disabled = false,
}: {
  className?: string;
  text: string | React.ReactNode;
  htmlType?: "submit" | "reset" | "button";
  disabled?: boolean;
}) {
  return (
    <Button
      type="primary"
      variant="solid"
      size="large"
      className={`${className} font-bold!`}
      htmlType={htmlType}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}
