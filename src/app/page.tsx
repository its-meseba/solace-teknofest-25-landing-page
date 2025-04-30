"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to My Project
                </h1>
                <p className="text-xl mb-8">
                    A clean slate ready for new development
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Get Started
                </Button>
            </div>
        </main>
    );
}
