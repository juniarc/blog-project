import BreadcrumbNav from "@/_components/breadcrumbs/BreadcrumbNav";
import SingleLoading from "@/_components/loadings/SingleLoading";

export default function NavTrail({ isLoading }: { isLoading: boolean }) {
  return isLoading ? (
    <SingleLoading className="w-[70vw] md:w-96 h-5" />
  ) : (
    <BreadcrumbNav pathname="my-profile" />
  );
}
