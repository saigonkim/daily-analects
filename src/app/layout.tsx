import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "논어 한구절로 시작하는 하루",
  description: "매일 아침, 삶의 방향을 잡아주는 논어의 지혜를 한 구절씩 만나보세요.",
  openGraph: {
    title: "논어 한구절로 시작하는 하루",
    description: "매일 아침, 삶의 방향을 잡아주는 논어의 지혜를 한 구절씩 만나보세요.",
    siteName: "논어 한구절",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "논어 한구절로 시작하는 하루",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-0MY8NQRCK5" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0MY8NQRCK5');
          `}
        </Script>
      </body>
    </html>
  );
}
