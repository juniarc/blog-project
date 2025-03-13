import SingleLoading from "@/_components/loadings/SingleLoading";
import EditProfileContainer from "./EditProfileContainer";
import { User } from "@/types/types";

export default function UserDetailContainer({
  isUserLoading,
  name,
  email,
  gender,
  id,
  status,
}: {
  isUserLoading: boolean;
  name: User["name"];
  email: User["email"];
  gender: User["gender"];
  id: User["id"];
  status: User["status"];
}) {
  return (
    <>
      <h2 className="font-bold text-3xl lg:text-5xl mt-5 lg:mt-10">
        My Profile
      </h2>

      <div className="w-full mt-5 lg:mt-5 flex flex-col gap-3">
        <div className="w-full flex">
          <p className="w-1/3 font-bold text-xs md:text-base">Name</p>
          {isUserLoading ? (
            <SingleLoading className="w-full lg:w-2/3 h-4" />
          ) : (
            <p className="capitalize w-2/3 break-words text-xs md:text-base">
              {name}
            </p>
          )}
        </div>
        <div className="w-full flex text-wrap">
          <p className="w-1/3 font-bold text-xs md:text-base">Email</p>
          {isUserLoading ? (
            <SingleLoading className="w-full lg:w-2/3 h-4" />
          ) : (
            <p className="w-2/3 break-words text-xs md:text-base">{email}</p>
          )}
        </div>
        <div className="w-full flex">
          <p className="w-1/3 font-bold text-xs md:text-base">Gender</p>
          {isUserLoading ? (
            <SingleLoading className="w-full lg:w-2/3 h-4" />
          ) : (
            <p className="capitalize text-xs md:text-base">{gender}</p>
          )}
        </div>
      </div>
      <EditProfileContainer user={{ id, name, email, gender, status }} />
    </>
  );
}
