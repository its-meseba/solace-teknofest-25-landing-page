"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
    return (
        <header className="border-b">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold"
                    >
                        My Project
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/" className="text-sm font-medium">
                            Home
                        </Link>
                        <Link href="/about" className="text-sm font-medium">
                            About
                        </Link>
                        <Link href="/contact" className="text-sm font-medium">
                            Contact
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Button variant="outline" size="sm" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                    <Button size="sm">Sign In</Button>
                </div>
            </div>
        </header>
    );
}
