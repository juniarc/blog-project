export default function HorizontalDivider({
  className,
}: {
  className?: string;
}) {
  return <div className={`${className} w-full h-px bg-black`}></div>;
}
