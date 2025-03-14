import NotFound from "@/_containers/not-found.tsx/NotFound";
import { useUserDetail } from "@/hooks/useUserDetail";
import { useUserBlogs } from "@/hooks/useUserBlogs";
import { useRouter } from "next/router";
import BlogsContainer from "@/_containers/my-profile/BlogsContainer";
import UserDetailContainer from "@/_containers/my-profile/UserDetailContainer";
import { getCookie } from "cookies-next";
import NavTrail from "@/_containers/my-profile/NavTrail";

export default function MyProfilePage() {
  const id = Number(getCookie("userId"));

  const router = useRouter();

  const {
    data: user,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useUserDetail(Number(id));

  const page = Number(router.query.page) || 0;
  const {
    data: blogs,
    isLoading: isBlogLoading,
    isError: isBlogError,
  } = useUserBlogs(page, Number(id));

  if (isUserError) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <NotFound text="Oops! We couldn't find the user." />
      </div>
    );
  }

  return (
    <main className="px-4 md:px-5 lg:px-20 min-h-screen lg:h-auto">
      <div className="w-full lg:flex">
        <div className="lg:w-1/3 lg:min-h-screen lg:border-e lg:border-e-black lg:py-5 lg:pr-10 mt-5 lg:mt-0">
          <NavTrail isLoading={isUserLoading} />
          <UserDetailContainer {...user} isUserLoading={isUserLoading} />
        </div>
        <BlogsContainer
          data={blogs}
          isBlogError={isBlogError}
          isBlogLoading={isBlogLoading}
          page={page}
          isUserLoading={isUserLoading}
        />
      </div>
    </main>
  );
}
