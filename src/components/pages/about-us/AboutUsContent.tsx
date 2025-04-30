"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    Lightbulb,
    Brain,
    Heart,
    Zap,
    Leaf,
    Code,
    Rocket,
    Globe,
    MicIcon,
    Cpu,
    Shield,
    Users,
    ChevronDown,
    Mail,
    Copy,
    Check,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import Image from "next/image";

// Define the sectors with their icons and updated styling
const sectorIcons = [
    { name: "Tech", icon: <Code className="h-4 w-4 md:h-5 md:w-5" /> },
    { name: "AI", icon: <Brain className="h-4 w-4 md:h-5 md:w-5" /> },
    { name: "Health", icon: <Heart className="h-4 w-4 md:h-5 md:w-5" /> },
    { name: "Energy", icon: <Zap className="h-4 w-4 md:h-5 md:w-5" /> },
    {
        name: "Sustainability",
        icon: <Leaf className="h-4 w-4 md:h-5 md:w-5" />,
    },
    {
        name: "Innovation",
        icon: <Lightbulb className="h-4 w-4 md:h-5 md:w-5" />,
    },
    { name: "Growth", icon: <Rocket className="h-4 w-4 md:h-5 md:w-5" /> },
    { name: "Global", icon: <Globe className="h-4 w-4 md:h-5 md:w-5" /> },
];

// Define Solace brand colors with enhanced palette
const DEFAULT_BRAND_COLORS = {
    primary: "#2f318b", // Deep purple
    secondary: "#4da9e7", // Light blue
    accent: "#f0f4ff", // Very light blue for backgrounds
    highlight: "#e8f4fd", // Light blue highlight
    dark: "#1a1b35", // Darker shade of primary
    light: "#ffffff",
};

// Animation variants for staggered animations
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// Define TaglineConfig type
interface TaglineConfig {
    highlight?: boolean;
    animation?: "standard" | "premium";
    specialEffects?: boolean;
}

// Component props interface
interface AboutUsContentProps {
    brandColors?: typeof DEFAULT_BRAND_COLORS;
    taglineConfig?: TaglineConfig;
}

export function AboutUsContent({
    brandColors = DEFAULT_BRAND_COLORS,
    taglineConfig = {
        highlight: false,
        animation: "standard",
        specialEffects: false,
    },
}: AboutUsContentProps) {
    // Use the provided brand colors or fallback to defaults
    const BRAND_COLORS = brandColors;

    // State to control spotlight effect
    const [showTaglineSpotlight, setShowTaglineSpotlight] = useState(false);
    // State to control contact modal
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    // Refs for scroll animations
    const heroRef = useRef<HTMLDivElement>(null);
    const visionRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const futureRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);

    // Use InView hooks for animation triggers
    const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
    const isVisionInView = useInView(visionRef, { once: true, amount: 0.3 });
    const isValuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
    const isTeamInView = useInView(teamRef, { once: true, amount: 0.3 });
    const isFutureInView = useInView(futureRef, { once: true, amount: 0.3 });
    const isScrollIndicatorInView = useInView(scrollIndicatorRef, {
        once: true,
        amount: 1,
    });
    const isTaglineInView = useInView(taglineRef, { once: true, amount: 1 });

    // Spotlight effect for the tagline on page load
    useEffect(() => {
        if (taglineConfig.highlight && isTaglineInView) {
            // Simplified approach with a single timeout
            const timer = setTimeout(() => {
                setShowTaglineSpotlight(true);

                // Clear the spotlight after 2 seconds
                const clearTimer = setTimeout(() => {
                    setShowTaglineSpotlight(false);
                }, 2000);

                return () => clearTimeout(clearTimer);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isTaglineInView, taglineConfig.highlight]);

    // Add a safe check for animation values
    const useSimplifiedAnimations = true; // Set this to true to use simplified animations

    // Scroll to the next section when clicking the scroll indicator
    const scrollToNextSection = () => {
        const nextSection = document.getElementById("introduction");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Function to copy email address to clipboard
    const [hasCopied, setHasCopied] = useState(false);

    const copyEmailToClipboard = () => {
        navigator.clipboard
            .writeText("solace@solace.com.tr")
            .then(() => {
                // Show a brief visual confirmation
                setHasCopied(true);
                setTimeout(() => {
                    setHasCopied(false);
                }, 2000);
            })
            .catch((err) => {
                console.error("Kopyalama işlemi başarısız oldu:", err);
            });
    };

    // Function to open email client
    const openEmailClient = () => {
        window.location.href = "mailto:solace@solace.com.tr";
    };

    return (
        <div className="min-h-screen overflow-hidden bg-gradient-to-b from-white to-[#f8f9ff]">
            {/* Hero Section with Enhanced Styling */}
            <section
                ref={heroRef}
                className="relative min-h-[90vh] flex items-center py-16 sm:py-20 md:py-28 overflow-hidden"
                style={{
                    background: `radial-gradient(circle at 70% 30%, ${BRAND_COLORS.accent}, transparent), 
                               linear-gradient(135deg, ${BRAND_COLORS.primary}08, ${BRAND_COLORS.secondary}15)`,
                }}
            >
                {/* Enhanced background elements with more dynamic animations */}
                <motion.div
                    className="absolute inset-0 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                >
                    {/* Abstract shapes and gradient orbs for visual interest */}
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

                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Enhanced logo and title */}
                            <motion.h1
                                className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 tracking-tight"
                                style={{
                                    color: BRAND_COLORS.primary,
                                    textShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                                }}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={
                                    isHeroInView ? { scale: 1, opacity: 1 } : {}
                                }
                                transition={{ duration: 1, delay: 0.2 }}
                            >
                                Solace
                            </motion.h1>

                            {/* Enhanced tagline with better typography */}
                            <motion.p
                                className="text-xl sm:text-2xl md:text-4xl text-foreground/80 mb-8 sm:mb-10 font-light"
                                initial={{ opacity: 0, y: 20 }}
                                animate={
                                    isHeroInView ? { opacity: 1, y: 0 } : {}
                                }
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                Teknolojiyi Konuşma Kolaylığında Sunuyoruz
                            </motion.p>

                            {/* Enhanced highlighted tagline with premium styling and special animations */}
                            <motion.div
                                ref={taglineRef}
                                className="relative inline-block z-10"
                                initial={
                                    useSimplifiedAnimations
                                        ? { opacity: 0 }
                                        : { scale: 0.9, opacity: 0 }
                                }
                                animate={
                                    useSimplifiedAnimations
                                        ? { opacity: 1 }
                                        : { scale: 1, opacity: 1 }
                                }
                                transition={{
                                    delay: 0.7,
                                    duration: 0.8,
                                }}
                                whileHover={
                                    useSimplifiedAnimations
                                        ? undefined
                                        : {
                                              scale: taglineConfig.highlight
                                                  ? 1.05
                                                  : 1.03,
                                              transition: { duration: 0.3 },
                                          }
                                }
                            >
                                {/* Decorative elements for emphasis - only use when not in simplified mode */}
                                {taglineConfig.specialEffects &&
                                    !useSimplifiedAnimations && (
                                        <motion.div
                                            className="absolute -inset-1 bg-gradient-to-r from-[#4da9e7]/30 via-[#2f318b]/20 to-[#4da9e7]/30 rounded-full blur-md -z-10"
                                            animate={{
                                                backgroundPosition: [
                                                    "0% 50%",
                                                    "100% 50%",
                                                    "0% 50%",
                                                ],
                                            }}
                                            transition={{
                                                duration: 15,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />
                                    )}
                                <motion.span
                                    className={`px-6 sm:px-10 py-3 sm:py-5 rounded-full text-base sm:text-xl md:text-2xl font-semibold shadow-lg inline-block ${
                                        taglineConfig.highlight &&
                                        !useSimplifiedAnimations
                                            ? "ring-2 ring-[#4da9e7]/30 ring-offset-2 ring-offset-white/10"
                                            : ""
                                    }`}
                                    style={{
                                        background: `linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))`,
                                        color: BRAND_COLORS.primary,
                                        border: `2px solid rgba(77,169,231,0.5)`,
                                        backdropFilter: "blur(12px)",
                                    }}
                                >
                                    <span
                                        className="relative inline-block"
                                        style={{
                                            textShadow:
                                                "0px 1px 1px rgba(0,0,0,0.1)",
                                            fontWeight: "bold",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        İnsanla teknolojiyi aynı dilde
                                        konuşturur
                                    </span>

                                    {/* Subtle accent elements */}
                                    {taglineConfig.specialEffects &&
                                        !useSimplifiedAnimations && (
                                            <>
                                                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-[#4da9e7] to-transparent rounded-full opacity-60"></span>
                                                {taglineConfig.highlight && (
                                                    <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-[#2f318b]/40 to-transparent rounded-full opacity-40"></span>
                                                )}
                                            </>
                                        )}
                                </motion.span>

                                {/* Special spotlight effect that appears briefly after the page loads */}
                                {!useSimplifiedAnimations && (
                                    <AnimatePresence>
                                        {showTaglineSpotlight &&
                                            taglineConfig.highlight && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full z-10 pointer-events-none"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 0.8 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 1 }}
                                                    style={{
                                                        boxShadow:
                                                            "0 0 30px 15px rgba(77, 169, 231, 0.3)",
                                                    }}
                                                />
                                            )}
                                    </AnimatePresence>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Elegant scroll indicator */}
                <motion.div
                    ref={scrollIndicatorRef}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
                    initial={{ opacity: 0, y: -10 }}
                    animate={
                        isScrollIndicatorInView ? { opacity: 1, y: 0 } : {}
                    }
                    transition={{ delay: 1.5, duration: 0.6 }}
                    onClick={scrollToNextSection}
                >
                    <motion.div
                        className="flex flex-col items-center"
                        animate={{ y: [0, 10, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                    >
                        <span className="text-sm text-gray-500 mb-2">
                            Keşfet
                        </span>
                        <ChevronDown
                            className="h-6 w-6"
                            style={{ color: BRAND_COLORS.secondary }}
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Introduction Section with Enhanced Design */}
            <section
                id="introduction"
                className="py-16 sm:py-20 md:py-28"
                style={{
                    background: `linear-gradient(to bottom, ${BRAND_COLORS.light}, ${BRAND_COLORS.accent})`,
                }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="prose prose-lg max-w-none text-center"
                        >
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 sm:mb-10 px-2 font-light">
                                Günümüzün dijitalleşmiş dünyasında teknolojinin
                                hızla gelişmesine rağmen, insanlar hâlâ onu
                                kullanmak için eğitilmek zorunda kalıyor. Biz bu
                                ilişkiyi tersine çeviriyoruz: Solace,
                                teknolojiyi insanların doğal davranışlarına
                                uyarlayan, konuşma temelli etkileşimi merkeze
                                alan bir teknoloji şirketidir.
                            </p>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-2">
                                2024 yılında İstanbul'da kurulan Solace, sesle
                                etkileşimli sistemler ve yerel yapay zekâ
                                teknolojileri geliştirerek, kullanıcı deneyimini
                                yalnızca fonksiyonel değil, aynı zamanda
                                sezgisel ve insana yakın hale getirmeyi
                                amaçlıyor. Bugün akıllı ev teknolojileriyle
                                başladığımız bu dönüşüm yolculuğunu, gelecekte
                                şehirlerin, mağazaların, ofislerin ve dijital
                                ürünlerin tamamına yaygınlaştırmayı
                                hedefliyoruz.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision and Mission Section with Enhanced Visual Elements */}
            <section
                ref={visionRef}
                className="py-16 sm:py-20 md:py-28"
                style={{
                    background: `linear-gradient(135deg, ${BRAND_COLORS.accent}, ${BRAND_COLORS.highlight})`,
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.03)",
                }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                            {/* Vision Card with Enhanced Design */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={
                                    isVisionInView ? { opacity: 1, x: 0 } : {}
                                }
                                transition={{ duration: 0.8 }}
                                className="bg-white/90 backdrop-blur-sm p-8 sm:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-[#4da9e7]/10"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 90% 10%, ${BRAND_COLORS.highlight}, transparent)`,
                                }}
                            >
                                <div
                                    className="rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-6 sm:mb-8 shadow-md"
                                    style={{
                                        background: `linear-gradient(135deg, ${BRAND_COLORS.primary}20, ${BRAND_COLORS.primary}05)`,
                                        border: `1px solid ${BRAND_COLORS.primary}20`,
                                    }}
                                >
                                    <Lightbulb
                                        className="h-7 w-7 sm:h-8 sm:w-8"
                                        style={{ color: BRAND_COLORS.primary }}
                                    />
                                </div>

                                <h2
                                    className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-7"
                                    style={{ color: BRAND_COLORS.primary }}
                                >
                                    Vizyonumuz
                                </h2>

                                <p className="text-sm sm:text-base leading-relaxed">
                                    İnsanlık tarihinin en köklü becerisi olan
                                    konuşmayı, teknolojik etkileşimin merkezine
                                    yerleştirerek her yaştan, her kesimden ve
                                    her coğrafyadan insanın teknoloji ile
                                    ilişkisini yeniden tanımlamak.
                                </p>
                            </motion.div>

                            {/* Mission Card with Enhanced Design */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={
                                    isVisionInView ? { opacity: 1, x: 0 } : {}
                                }
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-white/90 backdrop-blur-sm p-8 sm:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-[#4da9e7]/10"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 10% 90%, ${BRAND_COLORS.highlight}, transparent)`,
                                }}
                            >
                                <div
                                    className="rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-6 sm:mb-8 shadow-md"
                                    style={{
                                        background: `linear-gradient(135deg, ${BRAND_COLORS.secondary}20, ${BRAND_COLORS.secondary}05)`,
                                        border: `1px solid ${BRAND_COLORS.secondary}20`,
                                    }}
                                >
                                    <Rocket
                                        className="h-7 w-7 sm:h-8 sm:w-8"
                                        style={{
                                            color: BRAND_COLORS.secondary,
                                        }}
                                    />
                                </div>

                                <h2
                                    className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-7"
                                    style={{ color: BRAND_COLORS.secondary }}
                                >
                                    Misyonumuz
                                </h2>

                                <p className="text-sm sm:text-base leading-relaxed">
                                    Ses teknolojileri ve doğal dil anlayışındaki
                                    ileri teknolojik yetkinliklerimizi insan
                                    odaklı çözümlere dönüştürerek, teknolojinin
                                    daha kapsayıcı, daha erişilebilir ve daha
                                    insani olmasını sağlamak.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section with Enhanced Card Design */}
            <section
                ref={teamRef}
                className="py-16 sm:py-20 md:py-28"
                style={{
                    background: `linear-gradient(135deg, ${BRAND_COLORS.accent}, ${BRAND_COLORS.highlight})`,
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.03)",
                }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-14 text-center"
                        initial={{ opacity: 0 }}
                        animate={isTeamInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ color: BRAND_COLORS.primary }}
                    >
                        Biz Kimiz?
                    </motion.h2>

                    <motion.div
                        className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 sm:p-10 rounded-2xl shadow-xl mb-10 sm:mb-14 border border-[#4da9e7]/10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            backgroundImage: `radial-gradient(circle at 50% 0%, ${BRAND_COLORS.highlight}, transparent 70%)`,
                        }}
                    >
                        <p className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                            Solace, teknik mükemmeliyet kadar ürünleştirme,
                            kullanıcı odaklılık ve stratejik derinlik ilkelerini
                            benimsemiş disiplinler arası bir ekip tarafından
                            kurulmuştur.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed">
                            Kurucu ekibimiz; savunma sanayiinden yapay zekâ
                            araştırmalarına, finansal analizden gömülü donanım
                            tasarımına kadar geniş bir yetkinlik alanını kapsar.
                            Bu sayede, sadece yazılım değil; ölçeklenebilir
                            donanım, kurumsal iş birlikleri ve stratejik
                            pazarlama kurguları da Solace'ın çekirdek
                            yetenekleri arasında yer alır.
                        </p>
                    </motion.div>

                    {/* Team Stats with Animated Numbers */}
                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {[
                            { label: "Takım Üyesi", value: "12+" },
                            { label: "Ürün Geliştirme", value: "3+" },
                            { label: "İş Ortaklığı", value: "5+" },
                            { label: "Dil Desteği", value: "8+" },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-xl text-center shadow-lg border border-[#4da9e7]/10"
                                whileHover={{
                                    y: -5,
                                    transition: { duration: 0.2 },
                                }}
                            >
                                <motion.div
                                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
                                    style={{ color: BRAND_COLORS.primary }}
                                    initial={{ scale: 0.8 }}
                                    animate={isTeamInView ? { scale: 1 } : {}}
                                    transition={{
                                        delay: 0.2 + index * 0.1,
                                        duration: 0.5,
                                        type: "spring",
                                    }}
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-sm sm:text-base text-gray-600">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Values Section with Enhanced Grid Layout and Animations */}
            <section
                ref={valuesRef}
                className="py-16 sm:py-20 md:py-28"
                style={{
                    background: `linear-gradient(to bottom, ${BRAND_COLORS.light}, ${BRAND_COLORS.accent})`,
                }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-14 text-center"
                        initial={{ opacity: 0 }}
                        animate={isValuesInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ color: BRAND_COLORS.primary }}
                    >
                        Temel Değerlerimiz
                    </motion.h2>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isValuesInView ? "show" : "hidden"}
                    >
                        {[
                            {
                                icon: (
                                    <MicIcon
                                        className="h-6 w-6 sm:h-7 sm:w-7"
                                        style={{ color: BRAND_COLORS.primary }}
                                    />
                                ),
                                title: "İnsana Yakın Etkileşim",
                                description:
                                    "İnsana yakın etkileşim en etkili teknolojik arayüzdür.",
                                delay: 0,
                            },
                            {
                                icon: (
                                    <Shield
                                        className="h-6 w-6 sm:h-7 sm:w-7"
                                        style={{ color: BRAND_COLORS.primary }}
                                    />
                                ),
                                title: "Veri Gizliliği",
                                description:
                                    "Veri gizliliği ve yerel işlem, çağdaş yapay zekânın sorumlu gelişimi için vazgeçilmezdir.",
                                delay: 0.2,
                            },
                            {
                                icon: (
                                    <Cpu
                                        className="h-6 w-6 sm:h-7 sm:w-7"
                                        style={{ color: BRAND_COLORS.primary }}
                                    />
                                ),
                                title: "Konuşma Paradigması",
                                description:
                                    "Konfigürasyona değil, konuşmaya dayalı sistemler, teknolojide yeni bir kullanıcı paradigmasıdır.",
                                delay: 0.4,
                            },
                            {
                                icon: (
                                    <Globe
                                        className="h-6 w-6 sm:h-7 sm:w-7"
                                        style={{ color: BRAND_COLORS.primary }}
                                    />
                                ),
                                title: "Ölçülebilir Etki",
                                description:
                                    "Her ürün, bir strateji testidir. Her strateji, ölçülebilir etki yaratmalıdır.",
                                delay: 0.6,
                            },
                            {
                                icon: (
                                    <Users
                                        className="h-6 w-6 sm:h-7 sm:w-7"
                                        style={{ color: BRAND_COLORS.primary }}
                                    />
                                ),
                                title: "Yerel Üretim, Küresel Vizyon",
                                description:
                                    "Yerel üretim, küresel vizyonla birleştiğinde anlam kazanır.",
                                delay: 0.8,
                            },
                        ].map((value, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-7 shadow-lg border border-[#4da9e7]/10 hover:border-[#2f318b]/30 hover:shadow-xl transition-all duration-300"
                                whileHover={{
                                    y: -5,
                                    boxShadow:
                                        "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <div className="rounded-full bg-[#2f318b]/10 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-4 sm:mb-5 shadow-sm">
                                    {value.icon}
                                </div>
                                <h3
                                    className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                                    style={{ color: BRAND_COLORS.primary }}
                                >
                                    {value.title}
                                </h3>
                                <p className="text-sm sm:text-base text-foreground/80">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Future Section with Enhanced Design */}
            <section
                ref={futureRef}
                className="py-16 sm:py-20 md:py-28"
                style={{
                    background: `linear-gradient(to bottom, ${BRAND_COLORS.light}, ${BRAND_COLORS.highlight})`,
                }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 sm:mb-14 text-center"
                        initial={{ opacity: 0 }}
                        animate={isFutureInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ color: BRAND_COLORS.primary }}
                    >
                        Nereye Gidiyoruz?
                    </motion.h2>

                    <motion.div
                        className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 sm:p-10 rounded-2xl shadow-xl border border-[#4da9e7]/10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isFutureInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            backgroundImage: `radial-gradient(circle at 30% 100%, ${BRAND_COLORS.highlight}, transparent 60%)`,
                        }}
                    >
                        <p className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                            Solace bugün akıllı yaşam sistemleriyle faaliyet
                            gösterse de, biz kendimizi bir interface company
                            olarak görüyoruz: geleceğin sesle etkileşimli
                            kullanıcı arayüzlerini şekillendiren bir şirket.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                            Stratejimiz basit ve hedefe yönelik: Konuşmayı
                            teknolojinin evrensel arayüzü haline getirmek. Bunu
                            yaparken teknolojiyi, kullanıcıları ve piyasayı
                            derinlemesine anlamaktan yanayız.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed">
                            Solace olarak geleceğimizi, sesle etkileşimli
                            teknolojilerin yaygınlaşmasında öncü bir rol
                            üstlenerek, üç temel odak alanında
                            şekillendiriyoruz:
                        </p>

                        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Sürekli Yenilik",
                                    description:
                                        "Yapay zekâ, ses tanıma ve doğal dil işlemede ar-ge odaklı yaklaşım",
                                },
                                {
                                    title: "Kapsayıcı Ürünler",
                                    description:
                                        "Tüm yaş grupları ve yetkinlik düzeyleri için erişilebilir çözümler",
                                },
                                {
                                    title: "Stratejik İşbirlikleri",
                                    description:
                                        "Farklı sektörlere özel yapay zekâ entegrasyonları ve ortaklıklar",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-[#4da9e7]/5 p-5 rounded-xl border border-[#4da9e7]/10"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={
                                        isFutureInView
                                            ? { opacity: 1, y: 0 }
                                            : {}
                                    }
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.4 + index * 0.2,
                                    }}
                                >
                                    <h3
                                        className="text-lg font-bold mb-3"
                                        style={{ color: BRAND_COLORS.primary }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-700">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Enhanced CTA Section */}
            <section
                className="py-20 sm:py-24 md:py-32"
                style={{
                    background: `radial-gradient(circle at 30% 50%, ${BRAND_COLORS.accent}, transparent 70%),
                                linear-gradient(to top, ${BRAND_COLORS.primary}15, ${BRAND_COLORS.secondary}10)`,
                }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-8 sm:p-10 md:p-12 shadow-xl border border-[#4da9e7]/20"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        style={{
                            backgroundImage: `radial-gradient(circle at 50% 0%, ${BRAND_COLORS.light}, transparent 70%), 
                                            radial-gradient(circle at 80% 80%, ${BRAND_COLORS.highlight}, transparent 50%)`,
                        }}
                    >
                        <motion.div
                            className="text-center"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <p
                                className="text-lg sm:text-xl md:text-3xl font-medium mb-8 sm:mb-10"
                                style={{ color: BRAND_COLORS.primary }}
                            >
                                Teknoloji artık sizin dilinizi konuşuyor
                            </p>

                            <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-12">
                                <span
                                    className="block text-3xl sm:text-4xl md:text-6xl font-bold"
                                    style={{
                                        color: BRAND_COLORS.primary,
                                        textShadow:
                                            "0px 2px 4px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    Solace
                                </span>
                                <span
                                    className="block text-lg sm:text-xl md:text-2xl font-light"
                                    style={{ color: BRAND_COLORS.secondary }}
                                >
                                    Teknolojiyi Konuşma Kolaylığında Sunuyoruz
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <Button
                                    className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg h-auto rounded-xl shadow-lg hover:shadow-xl transition-all"
                                    style={{
                                        background: `linear-gradient(135deg, ${BRAND_COLORS.primary}, ${BRAND_COLORS.primary}cc)`,
                                        border: `1px solid ${BRAND_COLORS.primary}30`,
                                    }}
                                    onClick={() => setIsContactModalOpen(true)}
                                >
                                    Bizimle İletişime Geçin
                                </Button>
                                <Button
                                    variant="outline"
                                    className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg h-auto rounded-xl shadow-sm hover:shadow-md transition-all"
                                    style={{
                                        borderColor: BRAND_COLORS.secondary,
                                        color: BRAND_COLORS.secondary,
                                    }}
                                >
                                    Projelerimiz
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Modal */}
            <AnimatePresence>
                {isContactModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsContactModalOpen(false)}
                    >
                        <motion.div
                            className="bg-white/95 p-8 sm:p-10 rounded-2xl shadow-xl max-w-md w-full mx-4 backdrop-blur-md border border-[#4da9e7]/20"
                            style={{
                                backgroundImage: `radial-gradient(circle at 90% 10%, ${BRAND_COLORS.highlight}, transparent)`,
                            }}
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2
                                    className="text-2xl sm:text-3xl font-bold"
                                    style={{ color: BRAND_COLORS.primary }}
                                >
                                    İletişim Bilgileri
                                </h2>
                                <button
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                    onClick={() => setIsContactModalOpen(false)}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#4da9e7] to-transparent rounded-full opacity-40 mb-6"></div>

                            <div className="mb-8 text-center">
                                <p className="text-gray-600 mb-4">
                                    Bizimle iletişime geçmek için aşağıdaki
                                    e-posta adresini kullanabilirsiniz:
                                </p>
                                <div
                                    className="text-lg font-medium p-5 rounded-lg bg-[#f5f9ff] border border-[#4da9e7]/20 mb-4 flex items-center justify-center gap-3"
                                    style={{ color: BRAND_COLORS.primary }}
                                >
                                    <Mail
                                        className="text-[#4da9e7]"
                                        size={20}
                                    />
                                    <span className="font-bold">
                                        solace@solace.com.tr
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <Button
                                    className="flex-1 px-4 py-3 rounded-xl text-white transition-all relative overflow-hidden gap-2 flex items-center justify-center"
                                    style={{
                                        background: hasCopied
                                            ? `linear-gradient(135deg, #2ecc71, #27ae60)`
                                            : `linear-gradient(135deg, ${BRAND_COLORS.secondary}, ${BRAND_COLORS.secondary}cc)`,
                                        border: `1px solid ${hasCopied ? "#2ecc71" : BRAND_COLORS.secondary}30`,
                                    }}
                                    onClick={copyEmailToClipboard}
                                    disabled={hasCopied}
                                >
                                    <AnimatePresence mode="wait">
                                        {hasCopied ? (
                                            <motion.div
                                                key="copied"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -20, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center justify-center"
                                            >
                                                <Check
                                                    size={18}
                                                    className="mr-1"
                                                />
                                                Kopyalandı!
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="copy"
                                                initial={{ y: -20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: 20, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center justify-center"
                                            >
                                                <Copy
                                                    size={18}
                                                    className="mr-1"
                                                />
                                                E-posta Adresini Kopyala
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Button>

                                <Button
                                    className="flex-1 px-4 py-3 rounded-xl text-white transition-all flex items-center justify-center gap-2"
                                    style={{
                                        background: `linear-gradient(135deg, ${BRAND_COLORS.primary}, ${BRAND_COLORS.primary}cc)`,
                                        border: `1px solid ${BRAND_COLORS.primary}30`,
                                    }}
                                    onClick={openEmailClient}
                                >
                                    <Mail size={18} />
                                    E-posta Gönder
                                </Button>
                            </div>

                            <p className="text-center text-gray-500 text-sm mb-6">
                                En kısa sürede size dönüş yapacağız.
                            </p>

                            <Button
                                variant="outline"
                                className="w-full px-4 py-3 rounded-xl transition-all"
                                style={{
                                    borderColor: BRAND_COLORS.secondary,
                                    color: BRAND_COLORS.secondary,
                                }}
                                onClick={() => setIsContactModalOpen(false)}
                            >
                                Kapat
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
