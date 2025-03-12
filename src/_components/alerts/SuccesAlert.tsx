import { Alert } from "antd";

export default function SuccessAlert({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <Alert className={className} message={message} type="success" showIcon />
  );
}
