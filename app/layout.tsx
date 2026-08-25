import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://yonghoko.github.io/yongho-ko-profile";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Yongho Ko | Research · Projects · Wine Notes",
  description: "고용호의 연구 프로필, 학술 CV, 연구 프로젝트와 개인 와인 테이스팅 노트.",
  openGraph: { title: "Yongho Ko", description: "Research · Projects · Wine Notes", type: "website", url: siteUrl, images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: "Yongho Ko — Research, Projects and Wine Notes" }] },
  twitter: { card: "summary_large_image", title: "Yongho Ko", description: "Research · Projects · Wine Notes", images: [`${siteUrl}/og.png`] },
  icons: { icon: `${siteUrl}/favicon.png`, shortcut: `${siteUrl}/favicon.png`, apple: `${siteUrl}/favicon.png` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
