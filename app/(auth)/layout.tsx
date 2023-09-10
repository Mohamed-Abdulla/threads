import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Threads",
  description: "Generated by create next app",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={
        {
          //   baseTheme: dark,
        }
      }
    >
      <html lang="en">
        <body className={`${poppins.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
