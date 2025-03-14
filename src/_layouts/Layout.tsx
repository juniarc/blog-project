import Footer from "./footer/Footer";
import Header from "./header/Header";

export default function Layout({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div className={className}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
