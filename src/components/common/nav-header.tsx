"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    Menu,
    X,
    Home,
    MessageCircle,
    Mic,
    Sparkles,
    ChevronRight,
    LogIn,
    ShieldAlert,
} from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/registry/new-york-v4/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/registry/new-york-v4/ui/sheet";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Separator } from "@/registry/new-york-v4/ui/separator";
import { ModeToggle } from "./mode-toggle";
import { motion } from "framer-motion";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/registry/new-york-v4/ui/tooltip";

export function NavHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
    };

    const navItems = [
        {
            id: "solace",
            label: "Solace",
            icon: <Home className="h-4 w-4 sm:h-5 sm:w-5" />,
        },
        {
            id: "ensi-home",
            label: "Ensi Home",
            icon: (
                <Image
                    src="/branding/ensi/logo.png"
                    alt="Ensi Logo"
                    width={20}
                    height={20}
                    className="h-4 w-4 sm:h-5 sm:w-5 object-contain"
                />
            ),
        },
        {
            id: "ema",
            label: "EMA",
            icon: (
                <Image
                    src="/branding/ema/logo.png"
                    alt="EMA Logo"
                    width={20}
                    height={20}
                    className="h-4 w-4 sm:h-5 sm:w-5 object-contain"
                />
            ),
        },
    ];

    // Add direct link to About Us page
    const handleAboutUsClick = () => {
        router.push("/about-us");
        setIsOpen(false);
    };

    return (
        <>
            <div className="w-full flex items-center justify-between px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-48 py-3 sm:py-4 border-b relative bg-background/90 backdrop-blur-sm sticky top-0 z-50">
                {/* Logo - different versions for small and large screens */}
                <Link
                    href="/"
                    className="flex items-center gap-2 z-20"
                    onClick={() => scrollToSection("solace")}
                >
                    {/* Small screen logo (S only) */}
                    <div className="block md:hidden">
                        <Image
                            src="/branding/solace/logo_only_s.svg"
                            alt="Solace Logo"
                            width={35}
                            height={35}
                            className="w-[35px] h-[35px]"
                            priority
                        />
                    </div>

                    {/* Large screen logo (full logo) */}
                    <div className="hidden md:block">
                        <Image
                            src="/branding/solace/logo.svg"
                            alt="Solace Logo"
                            width={140}
                            height={45}
                            className="w-auto h-[35px] md:h-[40px] lg:h-[45px]"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden sm:hidden md:flex items-center gap-2 lg:gap-4">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-3 lg:gap-6 *:data-[slot=navigation-menu-item]:h-7 **:data-[slot=navigation-menu-link]:py-1 **:data-[slot=navigation-menu-link]:font-medium">
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.id}>
                                    <NavigationMenuLink
                                        asChild
                                        className="relative transition-colors hover:text-[#2f318b] cursor-pointer"
                                    >
                                        <span
                                            onClick={() =>
                                                scrollToSection(item.id)
                                            }
                                            className="flex items-center gap-1.5"
                                        >
                                            {item.label}
                                        </span>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex items-center gap-1 lg:gap-2">
                        <Button
                            onClick={handleAboutUsClick}
                            className="bg-[#2f318b] hover:bg-[#232269] text-white text-sm md:text-base py-1 px-3 md:py-2 md:px-4 h-8 md:h-9"
                        >
                            Hakkımızda
                        </Button>
                        <ModeToggle />
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex sm:flex md:hidden items-center gap-2 sm:gap-3">
                    <ModeToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 relative"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Menü</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[85vw] sm:w-[350px] p-0 border-l-primary/20"
                        >
                            {/* Header section with logo and close button */}
                            <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm border-b">
                                <div className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/branding/solace/logo.svg"
                                            alt="Solace Logo"
                                            width={120}
                                            height={40}
                                            className="w-auto h-[30px] sm:h-[35px]"
                                            priority
                                        />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 p-0 hover:bg-primary/10 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <X className="h-5 w-5" />
                                        <span className="sr-only">Kapat</span>
                                    </Button>
                                </div>
                            </div>

                            {/* Navigation items */}
                            <div className="px-4 py-4 sm:py-6 flex flex-col">
                                <div className="mb-1 ml-1 text-xs uppercase text-muted-foreground font-medium tracking-wide">
                                    Navigasyon
                                </div>
                                <Separator className="mb-4" />

                                {/* Menu items with animations */}
                                <div className="flex flex-col space-y-0.5 sm:space-y-1">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.2,
                                                delay: index * 0.05,
                                            }}
                                        >
                                            <div
                                                className="flex items-center justify-between p-2.5 sm:p-3 rounded-md 
                                                    transition-all duration-200 text-foreground hover:bg-muted cursor-pointer"
                                                onClick={() =>
                                                    scrollToSection(item.id)
                                                }
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-muted-foreground">
                                                        {item.icon}
                                                    </span>
                                                    <span className="text-sm sm:text-base">
                                                        {item.label}
                                                    </span>
                                                </div>
                                                <ChevronRight className="h-4 w-4 opacity-60" />
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* About Us Button */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.2,
                                            delay: navItems.length * 0.05,
                                        }}
                                    >
                                        <Button
                                            onClick={handleAboutUsClick}
                                            className="mt-4 w-full bg-[#2f318b] hover:bg-[#232269] text-white h-9 sm:h-10 text-sm sm:text-base"
                                        >
                                            Hakkımızda
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Footer with brand info */}
                            <div className="mt-auto border-t px-4 py-4 sm:py-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center opacity-80">
                                        <div className="text-sm text-muted-foreground">
                                            <p className="mb-1 text-xs uppercase text-muted-foreground font-medium tracking-wide">
                                                Solace Teknoloji
                                            </p>
                                            <p className="text-xs sm:text-sm text-muted-foreground">
                                                Teknofest KIBRIS 2025
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </>
    );
}
