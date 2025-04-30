import type { ReactNode } from "react";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
// import PlausibleProvider from 'next-plausible';

import { ThemeProvider } from "next-themes";

import { NavHeader } from "@/components/common/nav-header";
import { Footer } from "@/components/common/footer";
import "@/app/globals.css";
import { Toaster } from "@/registry/new-york-v4/ui/sonner";
import PageTransition from "@/components/common/page-transition";

// Load Geist Sans and Geist Mono fonts (Variable fonts with weights 100-900)
const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
    display: "swap",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
    display: "swap",
});

// Define the app's base URL
const APP_URL =
    process.env.NEXT_PUBLIC_APP_URL || "https://teknofest.solace.com.tr";

// Define the viewport configuration separately
export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f5f5ee" },
        { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    metadataBase: new URL(APP_URL),
    title: {
        default: "Solace - Teknolojiyi Konuşma Kolaylığında Sunuyoruz",
        template: "%s | Solace",
    },
    description:
        "Solace, insanla teknolojiyi aynı dili konuşur hale getirmek için kuruldu. Konuşma temelli yapay zekâ çözümleriyle teknolojik bariyerleri ortadan kaldırıyoruz.",
    keywords: [
        "yapay zekâ",
        "konuşma",
        "sesli asistan",
        "teknoloji",
        "EMA",
        "akıllı sistemler",
        "sesle etkileşim",
    ],
    authors: [
        {
            name: "Solace Ekibi",
            url: APP_URL,
        },
    ],
    creator: "Solace",
    publisher: "Solace",
    icons: {
        icon: [
            {
                url: "/logo.svg",
                type: "image/svg+xml",
            },
            {
                url: "/favicon.ico",
                sizes: "any",
            },
        ],
        apple: {
            url: "/logo.png",
            type: "image/png",
        },
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "tr_TR",
        url: APP_URL,
        siteName: "Solace",
        title: "Solace - Teknolojiyi Konuşma Kolaylığında Sunuyoruz",
        description:
            "Solace, teknolojiyi insanların doğal davranışlarına uyarlayan, konuşma temelli etkileşimi merkeze alan bir teknoloji şirketidir.",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "Solace Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Solace - Teknolojiyi Konuşma Kolaylığında Sunuyoruz",
        description:
            "Sesle etkileşimli sistemler ve yerel yapay zekâ teknolojileri geliştirerek, kullanıcı deneyimini sezgisel ve insana yakın hale getiriyoruz.",
        images: ["/logo.png"],
        creator: "@solace_tech",
    },
    manifest: "/manifest.json",
    category: "technology",
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        <html suppressHydrationWarning lang="en">
            <head></head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground overscroll-none antialiased`}
            >
                {/* <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'ochtarcus.com'} > */}

                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                    storageKey="solace-theme"
                >
                    <NavHeader />
                    <main className="min-h-screen">
                        <PageTransition>{children}</PageTransition>
                    </main>

                    <Footer />
                    <Toaster />
                </ThemeProvider>
                {/* </PlausibleProvider> */}
            </body>
        </html>
    );
};

export default Layout;
