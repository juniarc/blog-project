import BreadcrumbNav from "@/_components/breadcrumbs/BreadcrumbNav";
import BlogForm from "@/_components/forms/BlogForm";
import { useCreateBlog } from "@/hooks/blog/useCreateBlog";
import { BlogBodyRequest } from "@/types/types";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateBlogPage() {
  const router = useRouter();
  const { isSuccess, isError, isPending, mutate, error } = useCreateBlog();

  const [openAlert, setOpenAlert] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const idFromStorage = Number(getCookie("userId")) || null;
    setUserId(idFromStorage);
  }, []);

  const handleFinish = (values: BlogBodyRequest) => {
    if (userId !== null) {
      mutate(
        { ...values, user_id: userId },
        {
          onSuccess: () => {
            setOpenAlert(true);
            router.push("/");
          },
          onError: () => {
            setOpenAlert(true);
            setTimeout(() => setOpenAlert(false), 3000);
          },
        }
      );
    } else {
      showModal();
    }
  };

  return (
    <>
      <Head>
        <title>Create Blog</title>
        <meta
          name="description"
          content="Create your blog and share it with the world"
        />
      </Head>
      <main className="w-screen flex justify-center p-4 md:p-5 lg:px-20 overflow-hidden">
        <div className="w-full min-h-screen flex flex-col">
          <BreadcrumbNav pathname={router.pathname} />
          <div className="w-full mt-8">
            <h2 className="font-bold text-3xl lg:text-5xl text-center">
              Create Blog
            </h2>
            <BlogForm
              className="w-full lg:w-1/2"
              openAlert={openAlert}
              isPending={isPending}
              error={error}
              isError={isError}
              isSuccess={isSuccess}
              onFinishHandler={handleFinish}
              isRequired={true}
              failedMessage="Failed to create blog"
              successMessage="Blog created successfully"
              isModalOpen={isModalOpen}
              handleCloseModal={handleCancel}
              handleOpenModal={showModal}
            />
          </div>
        </div>
      </main>
    </>
  );
}
