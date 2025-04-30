import { Metadata, Viewport } from "next";
import { AboutUsContent } from "@/components/pages/about-us/AboutUsContent";

// Define the app's base URL
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://solace.com.tr";

// Define the viewport configuration separately
export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#2f318b" },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    metadataBase: new URL(APP_URL),
    title: "Hakkımızda | Solace",
    description:
        "Solace hakkında bilgi edinin - felsefemiz, misyonumuz ve ses etkileşimli yapay zeka teknolojilerimiz.",
    openGraph: {
        title: "Hakkımızda | Solace",
        description:
            "Solace hakkında bilgi edinin - felsefemiz, misyonumuz ve ses etkileşimli yapay zeka teknolojilerimiz.",
        url: `${APP_URL}/about-us`,
        siteName: "Solace",
        locale: "tr_TR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Hakkımızda | Solace",
        description:
            "Solace hakkında bilgi edinin - felsefemiz, misyonumuz ve ses etkileşimli yapay zeka teknolojilerimiz.",
    },
};

export default function AboutUsPage() {
    return <AboutUsContent />;
}
