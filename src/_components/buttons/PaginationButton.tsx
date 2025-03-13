import { useScreenSizeContext } from "@/providers/ScreenSizeProvider";
import { Pagination } from "antd";
import { useRouter } from "next/router";

export default function PaginationButton({
  totalItems,
  pageSize = 5,
  initialPage,
  title,
  body,
}: {
  totalItems: number;
  pageSize?: number;
  initialPage: number;
  title?: string;
  body?: string;
}) {
  const router = useRouter();
  const { deviceType } = useScreenSizeContext();

  const handleChange = (newPage: number) => {
    router.push(
      `${title ? `?title=${title}` : ""}${body ? `&body=${body}` : ""}${
        title || body ? `&page=${newPage}` : `?page=${newPage}`
      }`,
      undefined,
      {
        shallow: true,
      }
    );

    window.scrollTo({
      top: (document.getElementById("bloglistTitle")?.offsetTop || 0) - 100,
      behavior: "smooth",
    });
  };
  return (
    <div className="w-full flex justify-center mt-5">
      <Pagination
        onChange={handleChange}
        defaultCurrent={initialPage}
        total={totalItems}
        pageSize={pageSize}
        showLessItems={deviceType === "mobile"}
        showSizeChanger={false}
      />
    </div>
  );
}
