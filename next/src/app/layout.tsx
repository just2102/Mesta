import "~/styles/globals.scss";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "./_components/Header/Header";
import Providers from "./_providers/Providers";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Mesta",
  description: "Mesta Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
