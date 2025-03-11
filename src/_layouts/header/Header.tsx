import Logo from "@/_components/logo/Logo";
import TokenSection from "./TokenSection";

export default function Header() {
  return (
    <header className="w-screen bg-white border-b border-b-black sticky top-0 left-0 z-50">
      <div className="w-full h-full flex justify-between items-center px-4 py-2 md:px-5 md:py-3 lg:px-20">
        <div>
          <Logo />
        </div>
        <TokenSection />
      </div>
    </header>
  );
}
