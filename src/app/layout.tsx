import type { ReactNode } from "react";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
// import PlausibleProvider from 'next-plausible';

import { ThemeProvider } from "next-themes";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import PageTransition from "@/components/common/page-transition";
import { AuthProvider } from "@/context/auth-context";
import { VisitProvider } from "@/context/visit-context";
import { RecommendationProvider } from "@/context/recommendation-context";
import { AiPineconeInitializer } from "@/components/common/ai-embeddings-preloader";

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
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

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
        default: "My Clean Project",
        template: "%s | My Clean Project",
    },
    description: "A clean slate for a new project",
    icons: {
        icon: [
            {
                url: "/favicon.ico",
                sizes: "any",
            },
        ],
    },
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html suppressHydrationWarning lang="en">
            <head></head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground overscroll-none antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                    storageKey="theme"
                >
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
