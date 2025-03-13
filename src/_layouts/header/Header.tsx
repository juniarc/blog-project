import NavigationButton from "@/_components/buttons/NavigationButton";
import Logo from "@/_components/logo/Logo";
import { User } from "@/types/types";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function Header() {
  const [userId, setUserId] = useState<User["id"] | null>(null);
  useEffect(() => {
    const idFromCookie = getCookie("userId");
    setUserId(Number(idFromCookie));
  }, [userId]);

  return (
    <header className="w-screen bg-white border-b border-b-black sticky top-0 left-0 z-50">
      <div className="w-full h-full flex justify-between items-center px-4 py-2 md:px-5 md:py-3 lg:px-20">
        <div>
          <Logo />
        </div>
        {userId ? (
          <NavigationButton text="My Profile" href="/my-profile" />
        ) : (
          <NavigationButton text="Create User ID" href="/create-user" />
        )}
      </div>
    </header>
  );
}
