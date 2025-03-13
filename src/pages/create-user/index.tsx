import BreadcrumbNav from "@/_components/breadcrumbs/BreadcrumbNav";
import FormSection from "@/_containers/create-user/FormSection";
import { useCreateUser } from "@/hooks/useCreateUser";
import { UserBodyRequest } from "@/types/types";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateUserPage() {
  const router = useRouter();

  const [openAlert, setOpenAlert] = useState(false);

  const { isSuccess, isError, isPending, error, mutate } = useCreateUser();

  const handleFinish = (values: UserBodyRequest) => {
    mutate(
      { ...values, status: "active" },
      {
        onSuccess: () => {
          setOpenAlert(true);
          router.back();
        },
        onError: () => {
          setOpenAlert(true);
          setTimeout(() => setOpenAlert(false), 3000);
        },
      }
    );
  };

  return (
    <main className="w-screen flex justify-center p-4 md:p-5 lg:px-20 overflow-hidden">
      <div className="w-full h-screen flex flex-col">
        <BreadcrumbNav pathname={router.pathname} />
        <div className="w-full mt-8">
          <h2 className="font-bold text-3xl lg:text-5xl text-center">
            Create User
          </h2>
          <div className="w-full sm:flex justify-center mt-5 lg:mt-10">
            <FormSection
              className="w-1/2"
              openAlert={openAlert}
              isPending={isPending}
              error={error}
              isError={isError}
              isSuccess={isSuccess}
              onFinishHandler={handleFinish}
              isRequired={true}
              succesMessage="Succesfuyl create user"
              failedMessaged="Failed create user"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
