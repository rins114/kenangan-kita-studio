import Header from "@/components/organisms/Header";
import "./globals.css";
import { Providers } from "./providers";
import Main from "@/components/organisms/Main";

export const metadata = {
  title: "SIMPRO PBJ",
  description: "SISTEM INFORMASI PROAKTIF PENGADAAN BARANG & JASA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <Main>{children}</Main>
        </Providers>
      </body>
    </html>
  );
}
