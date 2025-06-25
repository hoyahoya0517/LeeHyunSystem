import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: `이현시스템`, // 브랜드 이름
  openGraph: {
    title: `이현시스템`,
    description: `새로운 세상을 만드는 기술`,
    images: "/images/apple-icon.png",
  },
  description: `귀여운 것만 팝니다`, // 브랜드 설명
  // other: {
  //   "google-site-verification": "z51t_yEWb2JkWC3tHdtTJOowpAhKeiiEdLAfcK2kJrk",
  //   "naver-site-verification": "3e6288a5a45db0b37299ef3b4859b4f466b98192",
  //   keywords: "스타스프레이,star spray,소품,소품샵",
  //   authors: "STAR SPRAY",
  // },
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
