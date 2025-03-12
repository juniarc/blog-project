import { useScreenSizeContext } from "@/providers/ScreenSizeProvider";
import { Pagination } from "antd";
import { useRouter } from "next/router";

export default function PaginationButton({
  totalPages,
  pageSize = 5,
  initialPage,
}: {
  totalPages: number;
  pageSize?: number;
  initialPage: number;
}) {
  const router = useRouter();
  const { deviceType } = useScreenSizeContext();

  const handleChange = (newPage: number) => {
    router.push(`/?page=${newPage}`, undefined, { shallow: true });

    window.scrollTo({
      top: (document.getElementById("postlistTitle")?.offsetTop || 0) - 100,
      behavior: "smooth",
    });
  };
  return (
    <div className="w-full flex justify-center mt-5">
      <Pagination
        onChange={handleChange}
        defaultCurrent={initialPage}
        total={totalPages}
        pageSize={pageSize}
        showLessItems={deviceType === "mobile"}
      />
    </div>
  );
}
