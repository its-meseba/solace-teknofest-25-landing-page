import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/registry/new-york-v4/ui/sonner";
import PlausibleProvider from "next-plausible";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function App({ Component, pageProps }: AppProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <>
            {/* <Script
        defer
        data-domain="ochtarcus-client.vercel.app" 
        src="/js/script.js"
        strategy="afterInteractive"
      /> */}
            {/* <PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'ochtarcus-client.vercel.app'}> */}
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <Component {...pageProps} />
                <Toaster />
            </ThemeProvider>
            {/* </PlausibleProvider> */}
        </>
    );
}
