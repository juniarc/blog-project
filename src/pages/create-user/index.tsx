import BreadcrumbNav from "@/_components/breadcrumbs/BreadcrumbNav";
import FormSection from "@/_containers/create-user/FormSection";
import { useRouter } from "next/router";

export default function CreateUserPage() {
  const router = useRouter();
  return (
    <main className="w-screen flex justify-center p-4 md:p-5 lg:px-20 overflow-hidden">
      <div className="w-full h-screen flex flex-col">
        <BreadcrumbNav pathname={router.pathname} />
        <div className="w-full mt-8">
          <h2 className="font-bold text-3xl lg:text-5xl text-center">
            Create User
          </h2>
          <FormSection />
        </div>
      </div>
    </main>
  );
}
