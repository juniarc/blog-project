import Layout from "@/_layouts/Layout";
import "@/styles/globals.css";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <Layout className={openSans.className}>
        <Component {...pageProps} />
      </Layout>
    </ConfigProvider>
  );
}
