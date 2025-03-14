import Layout from "@/_layouts/Layout";
import { AuthProvider } from "@/providers/AuthProvider";
import { ScreenSizeProvider } from "@/providers/ScreenSizeProvider";
import "@/styles/globals.css";
import theme from "@/styles/theme/themeConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ScreenSizeProvider>
            <Layout className={openSans.className}>
              <Component {...pageProps} />
            </Layout>
          </ScreenSizeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}
