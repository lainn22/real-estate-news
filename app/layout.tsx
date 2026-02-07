import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "대한민국 상업용 부동산 데일리 이슈",
  description: "평일 오전 9시에 업데이트되는 대한민국 상업용 부동산 이슈 요약",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
