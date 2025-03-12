import Link from "next/link";

export default function NavigationButton({
  text,
  href,
  className = "px-5 md:px-10",
}: {
  text: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${className} bg-[#1677ff] text-white font-bold h-10 rounded-md hover:bg-[#1677ff]/88 transition-colors flex items-center justify-center`}
    >
      {text}
    </Link>
  );
}
