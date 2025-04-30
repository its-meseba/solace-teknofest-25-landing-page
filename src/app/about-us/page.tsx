import { Metadata, Viewport } from "next";
import { AboutUsContent } from "@/components/pages/about-us/AboutUsContent";

// Define the app's base URL
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://solace.com.tr";

// Define brand colors for use in styling - adding highlight property to match component requirements
export const BRAND_COLORS = {
    primary: "#2f318b", // Deep purple
    secondary: "#4da9e7", // Light blue
    accent: "#f5f5f5", // Light gray for backgrounds
    highlight: "#e8f4fd", // Light blue highlight (added to match component requirements)
    light: "#ffffff", // White
    dark: "#121212", // Almost black for dark mode
};

// Define the viewport configuration with enhanced theme colors
export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: BRAND_COLORS.light },
        { media: "(prefers-color-scheme: dark)", color: BRAND_COLORS.primary },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

// Enhanced metadata with more detailed descriptions and image properties
export const metadata: Metadata = {
    metadataBase: new URL(APP_URL),
    title: "Hakkımızda | Solace - Sesle Etkileşimli Teknoloji",
    description:
        "Solace hakkında bilgi edinin - felsefemiz, misyonumuz ve ses etkileşimli yapay zeka teknolojilerimiz. İnsanla teknoloji arasında doğal bir köprü kuruyoruz.",
    openGraph: {
        title: "Hakkımızda | Solace - Sesle Etkileşimli Teknoloji",
        description:
            "Solace hakkında bilgi edinin - felsefemiz, misyonumuz ve ses etkileşimli yapay zeka teknolojilerimiz. İnsanla teknoloji arasında doğal bir köprü kuruyoruz.",
        url: `${APP_URL}/about-us`,
        siteName: "Solace",
        locale: "tr_TR",
        type: "website",
        images: [
            {
                url: `${APP_URL}/images/og-about-us.jpg`,
                width: 1200,
                height: 630,
                alt: "Solace Hakkında",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hakkımızda | Solace - Sesle Etkileşimli Teknoloji",
        description:
            "Solace hakkında bilgi edinin - felsefemiz, misyonumuz ve ses etkileşimli yapay zeka teknolojilerimiz. İnsanla teknoloji arasında doğal bir köprü kuruyoruz.",
        images: [`${APP_URL}/images/og-about-us.jpg`],
    },
};

export default function AboutUsPage() {
    // Special flag to highlight the tagline - fixing the animation type to match component requirements
    const taglineConfig = {
        highlight: true,
        animation: "premium" as const, // Type assertion to match the expected union type
        specialEffects: true,
    };

    return (
        <AboutUsContent
            brandColors={BRAND_COLORS}
            taglineConfig={taglineConfig}
        />
    );
}
