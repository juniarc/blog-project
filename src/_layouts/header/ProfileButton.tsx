import NavigationButton from "@/_components/buttons/NavigationButton";
import { User } from "@/types/types";

export default function ProfileButton({ id }: { id: User["id"] | null }) {
  return id ? (
    <NavigationButton text="My Profile" href="/my-profile" />
  ) : (
    <NavigationButton text="Create User ID" href="/create-user" />
  );
}
