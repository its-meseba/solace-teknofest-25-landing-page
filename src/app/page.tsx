"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MessageCircle, Mic, Home, ChevronDown, ArrowDown } from "lucide-react";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import { Separator } from "@/registry/new-york-v4/ui/separator";
import Products from "@/components/pages/home/Products";

export default function HomePage() {
    // Refs for scroll animations and navigation
    const solaceRef = useRef<HTMLDivElement>(null);
    const ensiHomeRef = useRef<HTMLDivElement>(null);
    const emaRef = useRef<HTMLDivElement>(null);

    // Check if sections are in view
    const isSolaceInView = useInView(solaceRef, { once: true, amount: 0.3 });
    const isEnsiHomeInView = useInView(ensiHomeRef, {
        once: true,
        amount: 0.3,
    });
    const isEmaInView = useInView(emaRef, { once: true, amount: 0.3 });

    const scrollToNextSection = (currentSection: string) => {
        if (currentSection === "solace" && ensiHomeRef.current) {
            ensiHomeRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (currentSection === "ensi-home" && emaRef.current) {
            emaRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#fcfaf8]">
            {/* Solace section */}
            <section
                id="solace"
                ref={solaceRef}
                className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-16 relative"
            >
                {/* Logo banner at the top */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 max-w-6xl mx-auto relative">
                    <div className="md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
                        <Image
                            src="/branding/solace/logo.svg"
                            alt="Solace Logo"
                            width={180}
                            height={60}
                            className="object-contain opacity-70 w-auto h-auto"
                            priority
                        />
                    </div>

                    <div className="md:w-1/3 text-center">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-[#f05a28]/70">
                            Teknofest 2025 Kıbrıs
                        </h2>
                    </div>

                    <div className="md:w-1/3 flex justify-center md:justify-end mt-4 md:mt-0">
                        <Image
                            src="/branding/teknofest/logo.png"
                            alt="Teknofest Logo"
                            width={220}
                            height={80}
                            className="object-contain opacity-70 w-auto h-auto"
                            priority
                        />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isSolaceInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-4xl mx-auto text-center"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-[#2f318b]">
                        Teknolojiyi Konuşma Kolaylığında Sunuyoruz
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
                        Solace, doğal dil etkileşimini temel alarak teknoloji
                        ile insanı konuşma kolaylığında buluşturur.
                    </p>

                    <Button
                        onClick={() => scrollToNextSection("solace")}
                        className="rounded-full bg-[#2f318b] hover:bg-[#2f318b]/90 text-white p-4 h-auto"
                    >
                        <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                </motion.div>

                <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 text-[#2f318b]/50" />
                    </motion.div>
                </div>
            </section>

            {/* Ensi Home section */}
            <section
                id="ensi-home"
                ref={ensiHomeRef}
                className="min-h-screen py-16 md:py-24 px-4 md:px-8 lg:px-16 flex flex-col bg-[#fafafa]"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isEnsiHomeInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 sm:mb-20"
                >
                    <div className="flex justify-center mb-6 sm:mb-8">
                        <Image
                            src="/branding/ensi/logo.png"
                            alt="Ensi Home Logo"
                            width={140}
                            height={45}
                            className="w-auto h-auto"
                        />
                    </div>

                    <div className="flex items-center justify-center relative">
                        <span className="absolute -left-4 sm:-left-6 md:-left-12 text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-[#54c5cf]/40 transform -translate-y-1/4">
                            1.
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#54c5cf] relative z-10">
                            Eviniz sizi anlasın
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 px-4">
                        Ensi ile eviniz artık sizi konuşuyor. Teknolojiyi
                        konuşarak kullanın.
                    </p>
                </motion.div>

                {/* Product showcases - redesigned to match the image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-[95%] mx-auto mb-16 md:mb-24">
                    {/* Ensi Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isEnsiHomeInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col items-start"
                    >
                        <div className="text-[#54c5cf] mb-2 sm:mb-3 text-3xl sm:text-4xl font-light">
                            +
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 sm:mb-8">
                            Ensi Box
                        </h3>
                        <div className="bg-[#f5f5f5] rounded-lg w-full h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <Image
                                src="/images/ensi/home-box.png"
                                alt="Ensi Box"
                                width={600}
                                height={600}
                                className="object-contain max-h-full"
                            />
                        </div>
                    </motion.div>

                    {/* Ensi Voice Assistant */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isEnsiHomeInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col items-start"
                    >
                        <div className="text-[#54c5cf] mb-2 sm:mb-3 text-3xl sm:text-4xl font-light">
                            +
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 sm:mb-8">
                            Ensi Voice Assistant
                        </h3>
                        <div className="bg-[#f5f5f5] rounded-lg w-full h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <Image
                                src="/images/ensi/voice-assistant.jpg"
                                alt="Ensi Voice Assistant"
                                width={600}
                                height={600}
                                className="object-contain max-h-full"
                            />
                        </div>
                    </motion.div>

                    {/* Ensi App */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isEnsiHomeInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col items-start sm:col-span-2 md:col-span-1 mx-auto md:mx-0 max-w-sm sm:max-w-none"
                    >
                        <div className="text-[#54c5cf] mb-2 sm:mb-3 text-3xl sm:text-4xl font-light">
                            +
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black mb-4 sm:mb-8">
                            Ensi App
                        </h3>
                        <div className="bg-[#f5f5f5] rounded-lg w-full h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <Image
                                src="/images/ensi/mobile-app-mockup.png"
                                alt="Ensi App"
                                width={600}
                                height={600}
                                className="object-contain max-h-full"
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isEnsiHomeInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 md:mt-24 max-w-4xl mx-auto"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        <Card className="border-none bg-[#f5f5f5] shadow-none rounded-xl">
                            <CardContent className="p-4 sm:p-6">
                                <Mic className="h-6 w-6 sm:h-8 sm:w-8 text-[#54c5cf] mb-2 sm:mb-3" />
                                <h4 className="text-base sm:text-lg font-semibold mb-2">
                                    Wake-Word Teknolojisi
                                </h4>
                                <p className="text-gray-600 text-xs sm:text-sm">
                                    Yerli wake-word motoru ile evinizle doğal
                                    olarak konuşun
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none bg-[#f5f5f5] shadow-none rounded-xl">
                            <CardContent className="p-4 sm:p-6">
                                <Home className="h-6 w-6 sm:h-8 sm:w-8 text-[#54c5cf] mb-2 sm:mb-3" />
                                <h4 className="text-base sm:text-lg font-semibold mb-2">
                                    Çoklu Protokol Desteği
                                </h4>
                                <p className="text-gray-600 text-xs sm:text-sm">
                                    KNX, Zigbee, Matter gibi farklı sistemlerle
                                    entegrasyon
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none bg-[#f5f5f5] shadow-none rounded-xl">
                            <CardContent className="p-4 sm:p-6">
                                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-[#54c5cf] mb-2 sm:mb-3" />
                                <h4 className="text-base sm:text-lg font-semibold mb-2">
                                    Bağlamsal Zeka
                                </h4>
                                <p className="text-gray-600 text-xs sm:text-sm">
                                    Komutları değil, niyetinizi anlayan akıllı
                                    sistem
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </section>

            {/* Add Products Section */}
            <Products />

            {/* EMA section */}
            <section
                id="ema"
                ref={emaRef}
                className="min-h-screen py-16 px-4 md:px-8 lg:px-16 flex flex-col"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isEmaInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="flex justify-center mb-6 sm:mb-8">
                        <Image
                            src="/branding/ema/logo.png"
                            alt="EMA Logo"
                            width={140}
                            height={45}
                            className="w-auto h-auto"
                        />
                    </div>

                    <div className="flex items-center justify-center relative">
                        <span className="absolute -left-4 sm:-left-6 md:-left-12 text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-[#48affd]/40 transform -translate-y-1/4">
                            2.
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#48affd] relative z-10">
                            Konuşun, EMA sizi anlasın
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 px-4">
                        Etkileşimli Müşteri Asistanı ile müşteriler konuştuğunu
                        anlayan bir teknolojiyle buluşuyor.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isEmaInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex items-center justify-center"
                    >
                        <Image
                            src="/images/ema/big.png"
                            alt="EMA Avatar"
                            width={240}
                            height={240}
                            className="object-contain w-auto h-auto sm:w-[260px] md:w-[300px]"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isEmaInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col justify-center"
                    >
                        <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-[#48affd]">
                            Mağazanızın Anlayan Yüzü
                        </h3>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex gap-3 sm:gap-4">
                                <div className="rounded-full bg-[#48affd]/10 p-2 sm:p-3 text-[#48affd] h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center flex-shrink-0">
                                    <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1 text-sm sm:text-base">
                                        5 Dil Desteği
                                    </h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        Müşteriler kendi dillerinde destek
                                        alabilir ve bilgi edinebilir
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 sm:gap-4">
                                <div className="rounded-full bg-[#48affd]/10 p-2 sm:p-3 text-[#48affd] h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center flex-shrink-0">
                                    <Mic className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1 text-sm sm:text-base">
                                        Doğal Konuşma
                                    </h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        Ekran kullanımı gerekmeden, doğal
                                        diyalog ile etkileşim
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 sm:gap-4">
                                <div className="rounded-full bg-[#48affd]/10 p-2 sm:p-3 text-[#48affd] h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center flex-shrink-0">
                                    <Home className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1 text-sm sm:text-base">
                                        Bağlamsal Anlama
                                    </h4>
                                    <p className="text-gray-600 text-xs sm:text-sm">
                                        Müşterinin niyetini ve ihtiyacını doğru
                                        analiz eden yapay zeka
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isEmaInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-12 sm:mt-16 text-center max-w-4xl mx-auto py-6 sm:py-8"
                >
                    <Separator className="mb-8 sm:mb-12 bg-[#48affd]/20" />
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#48affd] mb-4 sm:mb-6 px-4">
                        "Müşteriniz konuşacak. EMA anlayacak. Siz
                        kazanacaksınız."
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                        Her konuşma bir fırsattır. EMA ile satış potansiyelinizi
                        maksimuma çıkarın.
                    </p>
                    <Button className="bg-[#48affd] hover:bg-[#48affd]/90 text-white px-6 sm:px-8 py-4 sm:py-6 h-auto text-base sm:text-lg rounded-full">
                        Teknofest Standımızda Deneyin
                    </Button>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-6 sm:py-8 px-4 border-t border-gray-200">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/branding/solace/logo.svg"
                                alt="Solace Logo"
                                width={100}
                                height={35}
                                className="w-auto h-auto"
                            />
                            <span className="text-xs sm:text-sm text-gray-500">
                                Teknofest KIBRIS 2025
                            </span>
                        </div>

                        <div className="text-xs sm:text-sm text-gray-500">
                            © 2025 Solace Teknoloji. Tüm hakları saklıdır.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
