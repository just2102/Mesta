import "~/styles/globals.scss";

import { Inter } from "next/font/google";

import { Header } from "./_components/Header/Header";
import Web3ModalProvider from "~/context";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Mesta",
  description: "Mesta — The Place For Your Memories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ModalProvider>
          <Header />
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}
