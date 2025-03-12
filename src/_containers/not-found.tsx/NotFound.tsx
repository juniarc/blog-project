import Image from "next/image";
import NotfoundImage from "@/../public/images/not-found.png";
export default function NotFound({
  text = "404 - Not Found",
}: {
  text?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="w-full sm:size-1/3">
        <Image
          src={NotfoundImage}
          alt="Not Found Image"
          className="w-full h-full object-center object-contain"
        />
      </div>
      <p className="text-center font-bold text-xl lg:text-4xl">{text}</p>
    </div>
  );
}
