import { Button } from "antd";

export default function OutlinedButton({
  text,
  className,
  handleClick,
}: {
  text: string;
  handleClick: () => void;
  className?: string;
}) {
  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      className={`${className} text-xxs! md:text-base!`}
    >
      {text}
    </Button>
  );
}
