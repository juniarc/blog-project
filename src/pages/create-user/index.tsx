import { useRouter } from "next/router";
import { useState } from "react";
import { useCreateUser } from "@/hooks/user/useCreateUser";
import { UserBodyRequest } from "@/types/types";
import BreadcrumbNav from "@/_components/breadcrumbs/BreadcrumbNav";
import UserForm from "@/_components/forms/UserForm";
import Head from "next/head";

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
    <>
      <Head>
        <title>Create User</title>
        <meta name="description" content="Create your user ID to create blog" />
      </Head>
      <main className="w-screen flex justify-center p-4 md:p-5 lg:px-20 overflow-hidden">
        <div className="w-full h-screen flex flex-col">
          <BreadcrumbNav pathname={router.pathname} />
          <div className="w-full mt-8">
            <h2 className="font-bold text-3xl lg:text-5xl text-center">
              Create User
            </h2>
            <div className="w-full sm:flex justify-center mt-5 lg:mt-10">
              <UserForm
                className="w-full lg:w-1/2"
                openAlert={openAlert}
                isPending={isPending}
                error={error}
                isError={isError}
                isSuccess={isSuccess}
                onFinishHandler={handleFinish}
                isRequired={true}
                failedMessage="Failed to create user"
                successMessage="User added successfully"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
