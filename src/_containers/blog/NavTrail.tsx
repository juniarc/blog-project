import BreadcrumbNav from "@/_components/breadcrumbs/BreadcrumbNav";
import SingleLoading from "@/_components/loadings/SingleLoading";

export default function NavTrail({
  isLoading,
  title,
}: {
  isLoading: boolean;
  title: string | undefined;
}) {
  if (isLoading) return <SingleLoading className="w-[70vw] md:w-96 h-5" />;

  return <BreadcrumbNav pathname={`blogs/${title}`} />;
}
