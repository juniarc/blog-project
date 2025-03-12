import { Alert } from "antd";

export default function FailAlert({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <Alert
      className={`${className} first-letter:capitalize`}
      message={message}
      type="error"
      showIcon
    />
  );
}
