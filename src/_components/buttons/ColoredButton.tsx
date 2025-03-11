import { Button } from "antd";

export default function ColoredButton({
  className,
  text,
}: {
  className?: string;
  text: string;
}) {
  return (
    <Button
      type="primary"
      variant="solid"
      size="large"
      className={`${className} font-bold!`}
    >
      {text}
    </Button>
  );
}
