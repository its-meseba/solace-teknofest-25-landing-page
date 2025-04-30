import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ProductFeature = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`flex items-center mt-3 sm:mt-4 space-x-2 ${className}`}>
        <span className="text-xl sm:text-2xl font-bold text-black">+</span>
        <span className="text-sm sm:text-base md:text-lg">{children}</span>
    </div>
);

const ProtocolIcon = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative h-6 sm:h-8 w-16 sm:w-20 mx-1 sm:mx-2">
        <Image
            src={src}
            alt={alt}
            width={80}
            height={32}
            className="object-contain w-full h-full"
        />
    </div>
);

const ProductSection = ({
    title,
    imageUrl,
    features,
    showProtocols = false,
    reverse = false,
}: {
    title: string;
    imageUrl: string;
    features: string[];
    showProtocols?: boolean;
    reverse?: boolean;
}) => {
    return (
        <section
            className={`relative flex flex-col md:flex-row w-full min-h-[400px] md:min-h-[600px] ${reverse ? "md:flex-row-reverse" : ""}`}
        >
            <div className="w-full md:w-1/2 relative min-h-[300px] sm:min-h-[350px] md:min-h-0 flex items-center justify-center p-4 md:p-8">
                <div className="w-full h-full flex items-center justify-center">
                    <Image
                        src={imageUrl}
                        alt={title}
                        width={400}
                        height={400}
                        className="object-contain rounded-lg max-w-[85%] sm:max-w-[75%] md:max-w-[90%]"
                    />
                </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-xl mx-auto"
                >
                    <div className="text-[#54c5cf] text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-8">
                        <h2>{title}</h2>
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                        {features.map((feature, index) => (
                            <ProductFeature key={index}>
                                {feature}
                            </ProductFeature>
                        ))}
                    </div>

                    {showProtocols && (
                        <div className="mt-6 sm:mt-10">
                            <div className="bg-[#f5f5f5] rounded-xl p-4 sm:p-6">
                                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                                    Desteklenen Protokoller
                                </h4>
                                <div className="flex flex-wrap justify-center items-center">
                                    <ProtocolIcon
                                        src="/products/matter-logo.png"
                                        alt="Matter"
                                    />
                                    <ProtocolIcon
                                        src="/products/knx-logo.png"
                                        alt="KNX"
                                    />
                                    <ProtocolIcon
                                        src="/products/thread-logo.png"
                                        alt="Thread"
                                    />
                                    <ProtocolIcon
                                        src="/products/wifi-logo.png"
                                        alt="WiFi"
                                    />
                                    <ProtocolIcon
                                        src="/products/zigbee-logo.png"
                                        alt="Zigbee"
                                    />
                                    <ProtocolIcon
                                        src="/products/bluetooth-logo.png"
                                        alt="Bluetooth"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

const Products = () => {
    const voiceAssistantFeatures = [
        "Sesli Komutlarla Anında Cihaz Kontrolü",
        "Doğal Konuşmalarla Otomasyon Oluşturma",
        "Bulut ve Yerel Çalışabilen Hibrit Mod",
        "Kullanıcıya Uygun Ayarlanabilir Ses Profili",
        "Gizlilik Modu",
        "LED Işıklarla Anlık Görsel Geri Bildirim",
        "OTA Güncelleme Desteği",
    ];

    const boxFeatures = [
        "Akıllı Cihazlar için Yerel Veritabanı",
        "Yerel İşlem Gücü",
        "Çoklu Bağlantı Protokolü Desteği",
        "Kişiselleştirilebilir Tasarım",
        "OTA Güncelleme ve Hata Tanıma Desteği",
    ];

    const appFeatures = [
        "Uzaktan Cihaz Kontrolü",
        "Sesli Asistan Arayüzü",
        "Özelleştirilebilir Cihaz Ayarları",
        "Otomasyon Ekleme Arayüzü",
        "Kullanıcı Yönetim Sistemi",
    ];

    return (
        <div className="w-full flex flex-col py-12 sm:py-16 bg-[#fafafa]">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 text-[#54c5cf]">
                        Ürünlerimiz
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 sm:mb-8 px-4">
                        Ensi ürün ailesi ile evinizi konuşarak yönetin
                    </p>
                </div>

                <ProductSection
                    title="Ensi Voice Assistant"
                    imageUrl="/images/ensi/voice-assistant-box.jpg"
                    features={voiceAssistantFeatures}
                />

                <ProductSection
                    title="Ensi Box"
                    imageUrl="/images/ensi/box-detailed.png"
                    features={boxFeatures}
                    showProtocols={true}
                    reverse={true}
                />

                <ProductSection
                    title="Ensi App"
                    imageUrl="/images/ensi/mobile-app-2-mockup.png"
                    features={appFeatures}
                />
            </div>
        </div>
    );
};

export default Products;
