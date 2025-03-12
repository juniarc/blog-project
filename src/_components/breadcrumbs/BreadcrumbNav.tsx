import { Breadcrumb } from "antd";
import Link from "next/link";

export default function BreadcrumbNav({ pathname }: { pathname: string }) {
  const pathArray = pathname.split("/").filter((path) => path);

  const items = [
    {
      title: <Link href="/">Home</Link>,
    },
    ...pathArray.map((path, index) => {
      const isLast = index === pathArray.length - 1;
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      const formattedText = decodeURIComponent(path.replace(/-/g, " "));

      return {
        title: isLast ? (
          <span className="text-black font-semibold capitalize">
            {formattedText}
          </span>
        ) : (
          <Link href={href} className="capitalize">
            {formattedText}
          </Link>
        ),
      };
    }),
  ];
  return <Breadcrumb items={items} />;
}
