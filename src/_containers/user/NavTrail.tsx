import BreadcrumbNav from "@/_components/breadcrumbs/BreadcrumbNav";
import SingleLoading from "@/_components/loadings/SingleLoading";
import { User } from "@/types/types";

export default function NavTrail({
  isUserLoading,
  name,
}: {
  isUserLoading: boolean;
  name: User["name"];
}) {
  return isUserLoading ? (
    <SingleLoading className="w-[70vw] md:w-96 h-5" />
  ) : (
    <BreadcrumbNav pathname={`users/${name}`} />
  );
}
