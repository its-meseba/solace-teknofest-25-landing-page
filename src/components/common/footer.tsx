"use client";

import Link from "next/link";
import Image from "next/image";
import {
    MessageCircle,
    Home,
    Mic,
    ExternalLink,
    Mail,
    MapPin,
    Phone,
    Linkedin,
    Instagram,
} from "lucide-react";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Separator } from "@/registry/new-york-v4/ui/separator";
import { usePathname } from "next/navigation";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();

    const mainLinks = [
        {
            id: "solace",
            label: "Solace",
            icon: <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
        },
        {
            id: "ensi-home",
            label: "Ensi Home",
            icon: <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
        },
        {
            id: "ema",
            label: "EMA",
            icon: <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />,
        },
    ];

    const socialLinks = [
        {
            href: "https://www.linkedin.com/company/reach-solace/",
            label: "LinkedIn",
            icon: <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />,
        },
        {
            href: "https://www.instagram.com/solace.tech/",
            label: "Instagram",
            icon: <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />,
        },
        {
            href: "mailto:solace@solace.com.tr",
            label: "E-posta",
            icon: <Mail className="h-4 w-4 sm:h-5 sm:w-5" />,
        },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="border-t bg-[#fcfaf8] relative z-10 mt-8 sm:mt-12 md:mt-16">
            <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                    {/* Brand section */}
                    <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/branding/solace/logo.svg"
                                alt="Solace Logo"
                                width={120}
                                height={40}
                                className="w-auto h-[35px] sm:h-[40px] md:h-[45px]"
                            />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                            Teknolojiyi Konuşma Kolaylığında Sunuyoruz
                        </p>
                        <div className="flex items-center space-x-2 sm:space-x-3 mt-3 sm:mt-4">
                            {socialLinks.map((link) => (
                                <Button
                                    key={link.href}
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-[#2f318b]/10 hover:text-[#2f318b]"
                                    asChild
                                >
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.label}
                                    >
                                        {link.icon}
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-0">
                        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2f318b]">
                            Bölümler
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                            {mainLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-gray-600 hover:text-[#2f318b] transition-colors flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
                                    >
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3 sm:space-y-4 mt-4 lg:mt-0">
                        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2f318b]">
                            İletişim
                        </h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#2f318b] shrink-0 mt-0.5" />
                                <span className="text-xs sm:text-sm text-gray-600">
                                    Ayazağa Mahallesi Kemerburgaz Caddesi, Vadi
                                    İstanbul Park Sitesi, 7A Blok No:7B İç Kapı
                                    No: 4, Sarıyer İstanbul
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#2f318b]" />
                                <a
                                    href="mailto:solace@solace.com.tr"
                                    className="text-xs sm:text-sm text-gray-600 hover:text-[#2f318b] transition-colors"
                                >
                                    solace@solace.com.tr
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-6 sm:my-8 bg-gray-200" />

                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-xs sm:text-sm text-gray-600">
                        © {currentYear} Solace Teknoloji. Tüm hakları saklıdır.
                    </p>
                    <p className="text-xs text-gray-500 mt-2 sm:mt-0">
                        Teknofest KIBRIS 2025
                    </p>
                </div>
            </div>
        </footer>
    );
}
