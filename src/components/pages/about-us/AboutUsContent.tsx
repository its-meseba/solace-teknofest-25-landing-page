"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
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
} from "lucide-react";
import { usePageViewAnalytics } from "@/hooks/usePageViewAnalytics";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";

// Define the sectors with their icons
const sectorIcons = [
    { name: "Tech", icon: <Code className="h-3 w-3 sm:h-4 sm:w-4" /> },
    { name: "AI", icon: <Brain className="h-3 w-3 sm:h-4 sm:w-4" /> },
    { name: "Health", icon: <Heart className="h-3 w-3 sm:h-4 sm:w-4" /> },
    { name: "Energy", icon: <Zap className="h-3 w-3 sm:h-4 sm:w-4" /> },
    {
        name: "Sustainability",
        icon: <Leaf className="h-3 w-3 sm:h-4 sm:w-4" />,
    },
    {
        name: "Innovation",
        icon: <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />,
    },
    { name: "Growth", icon: <Rocket className="h-3 w-3 sm:h-4 sm:w-4" /> },
    { name: "Global", icon: <Globe className="h-3 w-3 sm:h-4 sm:w-4" /> },
];

// Define Solace brand colors
const BRAND_COLORS = {
    primary: "#2f318b", // Deep purple
    secondary: "#4da9e7", // Light blue
};

export function AboutUsContent() {
    // Initialize analytics tracking for this page
    usePageViewAnalytics({
        pageName: "About Us",
        pageCategory: "company",
        additionalParams: {
            page_section: "about",
        },
    });

    const heroRef = useRef<HTMLDivElement>(null);
    const visionRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    const teamRef = useRef<HTMLDivElement>(null);
    const futureRef = useRef<HTMLDivElement>(null);

    const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
    const isVisionInView = useInView(visionRef, { once: true, amount: 0.3 });
    const isValuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
    const isTeamInView = useInView(teamRef, { once: true, amount: 0.3 });
    const isFutureInView = useInView(futureRef, { once: true, amount: 0.3 });

    return (
        <div className="min-h-screen overflow-hidden">
            {/* Hero Section with Tagline */}
            <section
                ref={heroRef}
                className="relative py-16 sm:py-20 md:py-24 overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${BRAND_COLORS.primary}05, ${BRAND_COLORS.secondary}10)`,
                }}
            >
                <motion.div
                    className="absolute inset-0 -z-10"
                    initial={{ y: -20, opacity: 0.5 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <div className="absolute w-64 sm:w-96 h-64 sm:h-96 rounded-full top-0 -right-10 sm:-right-20 bg-gradient-to-b from-[#4da9e7]/20 to-transparent blur-3xl"></div>
                    <div className="absolute w-64 sm:w-96 h-64 sm:h-96 rounded-full -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 bg-gradient-to-t from-[#2f318b]/20 to-transparent blur-3xl"></div>
                </motion.div>

                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <h1
                                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6"
                                style={{ color: BRAND_COLORS.primary }}
                            >
                                Solace
                            </h1>

                            <p className="text-lg sm:text-xl md:text-3xl text-foreground/80 mb-6 sm:mb-8">
                                Teknolojiyi Konuşma Kolaylığında Sunuyoruz
                            </p>

                            <motion.div
                                className="inline-block"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={
                                    isHeroInView ? { scale: 1, opacity: 1 } : {}
                                }
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <span
                                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg md:text-xl font-medium"
                                    style={{
                                        backgroundColor: `${BRAND_COLORS.secondary}20`,
                                        color: BRAND_COLORS.secondary,
                                    }}
                                >
                                    İnsanla teknoloji aynı dili konuşur
                                </span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section
                className="py-12 sm:py-16 md:py-24"
                style={{
                    background: `linear-gradient(to bottom, #fff, ${BRAND_COLORS.primary}05)`,
                }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="prose prose-lg max-w-none text-center"
                        >
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 sm:mb-8 px-2">
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

            {/* Vision and Mission Section */}
            <section
                ref={visionRef}
                className="py-12 sm:py-16 md:py-24"
                style={{ background: `${BRAND_COLORS.primary}05` }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {/* Vision */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={
                                    isVisionInView ? { opacity: 1, x: 0 } : {}
                                }
                                transition={{ duration: 0.8 }}
                                className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg"
                            >
                                <div
                                    className="rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6"
                                    style={{
                                        backgroundColor: `${BRAND_COLORS.primary}15`,
                                    }}
                                >
                                    <Lightbulb
                                        className="h-6 w-6 sm:h-8 sm:w-8"
                                        style={{ color: BRAND_COLORS.primary }}
                                    />
                                </div>

                                <h2
                                    className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
                                    style={{ color: BRAND_COLORS.primary }}
                                >
                                    Vizyonumuz
                                </h2>

                                <p className="text-base sm:text-lg leading-relaxed">
                                    Teknolojiyi, insan doğasına en yakın arayüz
                                    olan konuşma üzerinden herkes için
                                    erişilebilir ve faydalı hale getirmek.
                                </p>
                            </motion.div>

                            {/* Mission */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={
                                    isVisionInView ? { opacity: 1, x: 0 } : {}
                                }
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg"
                            >
                                <div
                                    className="rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6"
                                    style={{
                                        backgroundColor: `${BRAND_COLORS.secondary}15`,
                                    }}
                                >
                                    <MicIcon
                                        className="h-6 w-6 sm:h-8 sm:w-8"
                                        style={{
                                            color: BRAND_COLORS.secondary,
                                        }}
                                    />
                                </div>

                                <h2
                                    className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
                                    style={{ color: BRAND_COLORS.secondary }}
                                >
                                    Misyonumuz
                                </h2>

                                <p className="text-base sm:text-lg leading-relaxed">
                                    Konuşma temelli yapay zekâ çözümleriyle
                                    insanların günlük hayatındaki teknolojik
                                    bariyerleri ortadan kaldırmak; güvenli,
                                    kişisel ve bağlamsal deneyimler sunan
                                    sistemler geliştirmek.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section
                ref={teamRef}
                className="py-12 sm:py-16 md:py-24"
                style={{
                    background: `linear-gradient(to top, ${BRAND_COLORS.primary}05, #fff, ${BRAND_COLORS.primary}05)`,
                }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
                        initial={{ opacity: 0 }}
                        animate={isTeamInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ color: BRAND_COLORS.primary }}
                    >
                        Biz Kimiz?
                    </motion.h2>

                    <motion.div
                        className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg mb-8 sm:mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
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
                </div>
            </section>

            {/* Values Section */}
            <section
                ref={valuesRef}
                className="py-12 sm:py-16 md:py-24"
                style={{ background: `${BRAND_COLORS.secondary}05` }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
                        initial={{ opacity: 0 }}
                        animate={isValuesInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ color: BRAND_COLORS.primary }}
                    >
                        Neye İnanıyoruz?
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: (
                                    <MicIcon
                                        className="h-5 w-5 sm:h-6 sm:w-6"
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
                                        className="h-5 w-5 sm:h-6 sm:w-6"
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
                                        className="h-5 w-5 sm:h-6 sm:w-6"
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
                                        className="h-5 w-5 sm:h-6 sm:w-6"
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
                                        className="h-5 w-5 sm:h-6 sm:w-6"
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
                                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-md border border-[#4da9e7]/20 hover:border-[#2f318b]/30 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={
                                    isValuesInView ? { opacity: 1, y: 0 } : {}
                                }
                                transition={{
                                    duration: 0.5,
                                    delay: value.delay,
                                }}
                                whileHover={{
                                    y: -5,
                                    boxShadow:
                                        "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <div className="rounded-full bg-[#2f318b]/10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
                                    {value.icon}
                                </div>
                                <h3
                                    className="text-lg sm:text-xl font-bold mb-2 sm:mb-3"
                                    style={{ color: BRAND_COLORS.primary }}
                                >
                                    {value.title}
                                </h3>
                                <p className="text-sm sm:text-base text-foreground/80">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Future Section */}
            <section
                ref={futureRef}
                className="py-12 sm:py-16 md:py-24"
                style={{
                    background: `linear-gradient(to bottom, #fff, ${BRAND_COLORS.primary}10)`,
                }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center"
                        initial={{ opacity: 0 }}
                        animate={isFutureInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ color: BRAND_COLORS.primary }}
                    >
                        Nereye Gidiyoruz?
                    </motion.h2>

                    <motion.div
                        className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isFutureInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                            Solace bugün akıllı yaşam sistemleriyle faaliyet
                            gösterse de, biz kendimizi bir interface company
                            olarak görüyoruz: geleceğin sesle etkileşimli
                            kullanıcı arayüzlerini şekillendiren bir şirket.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed mb-6">
                            Akıllı ev sistemleri, bu yolculuğun yalnızca ilk
                            adımı. Önümüzdeki yıllarda perakende, sağlık, eğitim
                            ve şehir teknolojileri gibi dikeylerde de konuşma
                            temelli yapay zekâ platformları sunmayı
                            hedefliyoruz.
                        </p>

                        <div className="flex justify-center mt-6 sm:mt-8">
                            <Button
                                className="text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 h-auto"
                                style={{
                                    backgroundColor: BRAND_COLORS.primary,
                                }}
                            >
                                Bize Ulaşın
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final Call to Action */}
            <section
                className="py-16 sm:py-20 md:py-32"
                style={{
                    background: `linear-gradient(to top, ${BRAND_COLORS.primary}15, ${BRAND_COLORS.secondary}05)`,
                }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg border border-[#4da9e7]/20"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="text-center"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <p
                                className="text-lg sm:text-xl md:text-3xl font-medium mb-6 sm:mb-8"
                                style={{ color: BRAND_COLORS.primary }}
                            >
                                Teknoloji artık sizin dilinizi konuşuyor
                            </p>

                            <div className="space-y-3 sm:space-y-4">
                                <span
                                    className="block text-2xl sm:text-3xl md:text-5xl font-bold"
                                    style={{ color: BRAND_COLORS.primary }}
                                >
                                    Solace
                                </span>
                                <span
                                    className="block text-lg sm:text-xl md:text-2xl"
                                    style={{ color: BRAND_COLORS.secondary }}
                                >
                                    Teknolojiyi Konuşma Kolaylığında Sunuyoruz
                                </span>
                            </div>

                            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg h-auto"
                                    style={{
                                        backgroundColor: BRAND_COLORS.primary,
                                    }}
                                >
                                    Bizimle İletişime Geçin
                                </Button>
                                <Button
                                    variant="outline"
                                    className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg h-auto"
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
        </div>
    );
}
