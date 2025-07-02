import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: `이현시스템`, // 브랜드 이름
  description: `새로운 세상을 만드는 기술`, // 브랜드 설명
  openGraph: {
    title: `이현시스템`,
    description: `새로운 세상을 만드는 기술`,
    images:
      "https://res.cloudinary.com/hoyahoya/image/upload/v1749929215/leehyun/44-min_atsczg.png",
  },
  verification: {
    google: "x2zE3oA_lfyPLrYhpFYcJYorjEtoHzIwsP2jJefInFA",
  },
  keywords: ["이현시스템", "leehyun", "leehyun system", "leehyun system"],
  authors: [{ name: "이현시스템" }],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <link rel="icon" href="/images/favicon.ico" sizes="48x48" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-icon.png"
      />
      <body>{children}</body>
    </html>
  );
}
