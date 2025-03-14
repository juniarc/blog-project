import Logo from "@/_components/logo/Logo";

export default function Footer() {
  return (
    <footer className="w-full p-4 md:p-5 lg:px-20 lg:py-10 border-t border-t-black mt-8 lg:mt-0">
      <div className="w-full flex justify-between">
        <Logo />
        <nav>
          <ul className="flex gap-4 text-xxs md:text-base">
            <li>
              <a href="*">Home</a>
            </li>
            <li>
              <a href="*">About</a>
            </li>
            <li>
              <a href="*">Privacy Policy</a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <p className="w-full text-end text-xxs md:text-base mt-2">
          <span>&#169;</span> 2024 JUNIARC
        </p>
      </div>
    </footer>
  );
}
