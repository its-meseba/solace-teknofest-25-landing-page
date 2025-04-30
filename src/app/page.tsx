"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    MessageCircle,
    Mic,
    Home,
    ChevronDown,
    ArrowDown,
    Rocket,
    Globe,
    Zap,
    Heart,
    Lightbulb,
    Brain,
    Shield,
    Users,
    Mail,
    ExternalLink,
    Copy,
    X,
    Check,
} from "lucide-react";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import { Separator } from "@/registry/new-york-v4/ui/separator";
import Products from "@/components/pages/home/Products";
import Link from "next/link";

// Define animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// Enhanced animation variants for hero elements
const heroItemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

// Solace brand colors
const BRAND_COLORS = {
    primary: "#2f318b", // Deep purple
    secondary: "#4da9e7", // Light blue for EMA
    accent: "#54c5cf", // Teal for ENSI
    highlight: "#f05a28", // Orange accent
    light: "#fcfaf8",
    dark: "#1a1b35",
};

export default function HomePage() {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const copyEmailToClipboard = () => {
        navigator.clipboard.writeText("solace@solace.com.tr");
    };

    const openEmailClient = () => {
        window.location.href = "mailto:solace@solace.com.tr";
    };

    const [hasCopied, setHasCopied] = useState(false);

    // Refs for scroll animations and navigation
    const solaceRef = useRef<HTMLDivElement>(null);
    const ensiHomeRef = useRef<HTMLDivElement>(null);
    const emaRef = useRef<HTMLDivElement>(null);
    const productsRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    // Check if sections are in view
    const isSolaceInView = useInView(solaceRef, { once: true, amount: 0.3 });
    const isEnsiHomeInView = useInView(ensiHomeRef, {
        once: true,
        amount: 0.3,
    });
    const isEmaInView = useInView(emaRef, { once: true, amount: 0.3 });
    const isProductsInView = useInView(productsRef, {
        once: true,
        amount: 0.3,
    });
    const isContactInView = useInView(contactRef, {
        once: true,
        amount: 0.3,
    });

    // Function to scroll to next section
    const scrollToNextSection = (currentSection: string) => {
        if (currentSection === "solace" && ensiHomeRef.current) {
            ensiHomeRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (currentSection === "ensi-home" && productsRef.current) {
            productsRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (currentSection === "products" && emaRef.current) {
            emaRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (currentSection === "ema" && contactRef.current) {
            contactRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#fcfaf8] to-[#f8f9ff] overflow-hidden">
            {/* Solace Hero Section - Enhanced with better animations and visual elements */}
            <section
                id="solace"
                ref={solaceRef}
                className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-16 relative"
                style={{
                    background: `radial-gradient(circle at 70% 30%, ${BRAND_COLORS.accent}15, transparent), 
                               linear-gradient(135deg, ${BRAND_COLORS.primary}08, ${BRAND_COLORS.secondary}15)`,
                }}
            >
                {/* Enhanced abstract background elements */}
                <motion.div
                    className="absolute inset-0 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                >
                    <motion.div
                        className="absolute w-[30rem] h-[30rem] rounded-full top-[-15rem] right-[-10rem] bg-gradient-to-b from-[#4da9e7]/20 to-transparent blur-3xl"
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 0.7, 0.5],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                    <motion.div
                        className="absolute w-[35rem] h-[35rem] rounded-full bottom-[-20rem] left-[-15rem] bg-gradient-to-t from-[#2f318b]/25 to-transparent blur-3xl"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 2,
                        }}
                    />
                    <motion.div
                        className="absolute w-[15rem] h-[15rem] rounded-full top-[15rem] left-[10%] bg-gradient-to-r from-[#4da9e7]/10 to-transparent blur-2xl"
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 1,
                        }}
                    />
                </motion.div>

                {/* Logo banner at the top with enhanced animations */}
                <motion.div
                    className="w-full flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 max-w-6xl mx-auto relative z-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.div
                        className="md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src="/branding/bilisim-vadisi/logo.png"
                            alt="Bilisim Vadisi Logo"
                            width={180}
                            height={60}
                            className="object-contain w-auto h-auto"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        className="md:w-1/3 flex justify-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src="/branding/solace/logo.svg"
                            alt="Solace Logo"
                            width={180}
                            height={60}
                            className="object-contain w-auto h-auto"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        className="md:w-1/3 flex justify-center md:justify-end mt-4 md:mt-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src="/branding/teknofest/logo.png"
                            alt="Teknofest Logo"
                            width={180}
                            height={60}
                            className="object-contain w-auto h-auto"
                            priority
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full max-w-4xl mx-auto text-center relative z-10"
                    variants={containerVariants}
                >
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-[#f05a28]"
                        initial={{ opacity: 0, y: 40 }}
                        animate={isSolaceInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        variants={heroItemVariants}
                    >
                        Teknofest 2025 Kıbrıs
                    </motion.h2>

                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-[#2f318b] leading-tight"
                        initial={{ opacity: 0, y: 40 }}
                        animate={isSolaceInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        variants={heroItemVariants}
                    >
                        Teknolojiyi Konuşma Kolaylığında Sunuyoruz
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 md:mb-12 max-w-2xl mx-auto px-4 leading-relaxed"
                        initial={{ opacity: 0, y: 40 }}
                        animate={isSolaceInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        variants={heroItemVariants}
                    >
                        Solace, doğal dil etkileşimini temel alarak teknoloji
                        ile insanı konuşma kolaylığında buluşturur.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isSolaceInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        className="flex justify-center"
                    >
                        <Button
                            onClick={() => scrollToNextSection("solace")}
                            className="rounded-full bg-[#2f318b] hover:bg-[#2f318b]/90 text-white px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all text-lg"
                        >
                            <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                            Keşfedin
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="absolute bottom-8 left-0 right-0 flex justify-center z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8 text-[#2f318b]/50" />
                    </motion.div>
                </motion.div>
            </section>
            {/* Ensi Home section with enhanced styling and animations */}
            <section
                id="ensi-home"
                ref={ensiHomeRef}
                className="min-h-screen py-16 md:py-24 px-4 md:px-8 lg:px-16 flex flex-col"
                style={{
                    background: `linear-gradient(to bottom, ${BRAND_COLORS.light}, ${BRAND_COLORS.accent}10)`,
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.03)",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isEnsiHomeInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 sm:mb-20"
                >
                    <div className="flex justify-center mb-6 sm:mb-8">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src="/branding/ensi/logo.png"
                                alt="Ensi Home Logo"
                                width={160}
                                height={55}
                                className="w-auto h-auto"
                            />
                        </motion.div>
                    </div>

                    <div className="flex items-center justify-center relative">
                        <span className="absolute -left-4 sm:-left-6 md:-left-12 text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-[#54c5cf]/40 transform -translate-y-1/4">
                            1.
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#54c5cf] relative z-10">
                            Eviniz sizi anlasın
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 px-4 leading-relaxed">
                        Ensi ile eviniz artık sizi anlıyor. Teknolojiyi
                        konuşarak kullanın.
                    </p>
                </motion.div>

                {/* Product showcases - redesigned with enhanced styling and animations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-[95%] mx-auto mb-16 md:mb-24">
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
                        <motion.div
                            className="bg-white rounded-lg w-full h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center p-4 shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#54c5cf]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Image
                                src="/images/ensi/home-box.png"
                                alt="Ensi Box"
                                width={600}
                                height={600}
                                className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                            />
                        </motion.div>
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
                        <motion.div
                            className="bg-white rounded-lg w-full h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center p-4 shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#54c5cf]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Image
                                src="/images/ensi/voice-assistant.jpg"
                                alt="Ensi Voice Assistant"
                                width={600}
                                height={600}
                                className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                            />
                        </motion.div>
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
                        <motion.div
                            className="bg-white rounded-lg w-full h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center p-4 shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#54c5cf]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Image
                                src="/images/ensi/mobile-app-mockup.png"
                                alt="Ensi App"
                                width={600}
                                height={600}
                                className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
                            />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Features section with improved card styling */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isEnsiHomeInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 md:mt-24 max-w-4xl mx-auto"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: (
                                    <Mic className="h-6 w-6 text-[#54c5cf]" />
                                ),
                                title: "Wake-Word Teknolojisi",
                                description:
                                    "Yerli wake-word motoru ile evinizle doğal olarak konuşun",
                            },
                            {
                                icon: (
                                    <Home className="h-6 w-6 text-[#54c5cf]" />
                                ),
                                title: "Çoklu Protokol Desteği",
                                description:
                                    "KNX, Zigbee, Matter gibi farklı sistemlerle entegrasyon",
                            },
                            {
                                icon: (
                                    <MessageCircle className="h-6 w-6 text-[#54c5cf]" />
                                ),
                                title: "Bağlamsal Zeka",
                                description:
                                    "Komutları değil, niyetinizi anlayan akıllı sistem",
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{
                                    y: -5,
                                    boxShadow:
                                        "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="border border-[#54c5cf]/10 bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden group h-full">
                                    <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                                        <div className="rounded-full bg-[#54c5cf]/10 p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-[#54c5cf]/20 transition-colors duration-300">
                                            {feature.icon}
                                        </div>
                                        <h4 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm sm:text-base text-gray-700 mt-auto">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                {/* 
                <div className="flex justify-center mt-16">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Button
                            onClick={() => scrollToNextSection("ensi-home")}
                            className="rounded-full bg-[#54c5cf] hover:bg-[#54c5cf]/90 text-white px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all text-lg"
                        >
                            <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                            Ürünlerimiz
                        </Button>
                    </motion.div>
                </div> */}
            </section>
            {/* Products Section with ref and improved visibility for mobile screens */}
            <div ref={productsRef}>
                <Products />
            </div>
            {/* EMA section with enhanced styling and animations */}
            <section
                id="ema"
                ref={emaRef}
                className="min-h-screen py-16 md:py-24 px-4 md:px-8 lg:px-16 flex flex-col"
                style={{
                    background: `linear-gradient(to bottom, ${BRAND_COLORS.light}, ${BRAND_COLORS.secondary}10)`,
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.03)",
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isEmaInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <div className="flex justify-center mb-6 sm:mb-8">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src="/branding/ema/logo.png"
                                alt="EMA Logo"
                                width={160}
                                height={55}
                                className="w-auto h-auto"
                            />
                        </motion.div>
                    </div>

                    <div className="flex items-center justify-center relative">
                        <span className="absolute -left-4 sm:-left-6 md:-left-12 text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-[#48affd]/40 transform -translate-y-1/4">
                            2.
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#48affd] relative z-10">
                            Konuşun, EMA sizi anlasın
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 px-4 leading-relaxed">
                        Etkileşimli Müşteri Asistanı ile müşteriler konuştuğunu
                        anlayan bir teknolojiyle buluşuyor.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-md border border-[#48affd]/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isEmaInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        backgroundImage: `radial-gradient(circle at 0% 100%, ${BRAND_COLORS.secondary}05, transparent 70%)`,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isEmaInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex items-center justify-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src="/images/ema/big.png"
                                alt="EMA Avatar"
                                width={280}
                                height={280}
                                className="object-contain w-auto h-auto sm:w-[280px] md:w-[320px] drop-shadow-xl"
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isEmaInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col justify-center"
                    >
                        <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-[#48affd]">
                            Mağazanızın Anlayan Yüzü
                        </h3>

                        <div className="space-y-6 sm:space-y-8">
                            {[
                                {
                                    icon: (
                                        <Globe className="h-6 w-6 sm:h-7 sm:w-7" />
                                    ),
                                    title: "5 Dil Desteği",
                                    description:
                                        "Müşteriler kendi dillerinde destek alabilir ve bilgi edinebilir",
                                },
                                {
                                    icon: (
                                        <Mic className="h-6 w-6 sm:h-7 sm:w-7" />
                                    ),
                                    title: "Doğal Konuşma",
                                    description:
                                        "Ekran kullanımı gerekmeden, doğal diyalog ile etkileşim",
                                },
                                {
                                    icon: (
                                        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
                                    ),
                                    title: "Bağlamsal Anlama",
                                    description:
                                        "Müşterinin niyetini ve ihtiyacını doğru analiz eden yapay zeka",
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex gap-4 group"
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="rounded-full bg-[#48affd]/10 p-3 text-[#48affd] h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-[#48affd]/20 transition-colors duration-300">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1 text-base sm:text-lg text-gray-900">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm sm:text-base text-gray-700">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isEmaInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 sm:mt-20 text-center max-w-4xl mx-auto py-6 sm:py-8"
                >
                    <Separator className="mb-10 sm:mb-12 bg-[#48affd]/20" />
                    <motion.div
                        className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-[#48affd]/10"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            backgroundImage: `radial-gradient(circle at 70% 10%, ${BRAND_COLORS.secondary}05, transparent 70%)`,
                        }}
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#48affd] mb-6 md:mb-8 px-4">
                            "Müşteriniz konuşacak. EMA anlayacak. Siz
                            kazanacaksınız."
                        </h2>
                        <p className="text-base sm:text-lg text-gray-700 mb-8 md:mb-10 px-4 leading-relaxed">
                            Her konuşma bir fırsattır. EMA ile satış
                            potansiyelinizi maksimuma çıkarın.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button
                                className="bg-[#48affd] hover:bg-[#48affd]/90 text-white px-8 py-6 h-auto text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                                onClick={() => scrollToNextSection("ema")}
                            >
                                Teknofest Standımızda Deneyin
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
