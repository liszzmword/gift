import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR, Gaegu } from "next/font/google";
import "./globals.css";

const pretendard = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-pretendard",
  display: "swap",
});

const gaegu = Gaegu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gaegu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "갖고싶은 선물있어?? 내가 사줄게!!",
  description: "친구에게 선물을 골라달라고 해보세요 🎁",
  openGraph: {
    title: "🎁 갖고싶은 선물있어?? 내가 사줄게!!",
    description: "친구가 당신에게 선물을 준비했어요!",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FFF9F4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${gaegu.variable}`}>
      <body>{children}</body>
    </html>
  );
}
