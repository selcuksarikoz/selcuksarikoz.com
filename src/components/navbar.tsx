"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Code,
    Home,
    Mail,
    Camera,
    Layers,
    FileText,
    Menu,
    X,
} from "lucide-react";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Navigation items with icons and paths
    const navItems = [
        {name: "Home", path: "/", icon: <Home className="w-4 h-4"/>},
        {name: "Apps", path: "/apps", icon: <Layers className="w-4 h-4"/>},
        {
            name: "Photography",
            path: "/photography",
            icon: <Camera className="w-4 h-4"/>,
        },
        {name: "Blog", path: "/blog", icon: <FileText className="w-4 h-4"/>},
        {name: "Contact", path: "/contact", icon: <Mail className="w-4 h-4"/>},
    ];

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled || mobileMenuOpen
                    ? "bg-dark-50/90 backdrop-blur-md py-3 shadow-lg"
                    : "bg-transparent py-5"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="group">
                        <div className="flex items-center gap-2 relative">
                            <div
                                className="relative h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20 transform group-hover:scale-105 transition-all duration-300">
                                <Code className="h-5 w-5 text-primary"/>
                                <div
                                    className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">
                  Selcuk S.
                </span>
                                <span className="text-xs text-primary-light font-mono -mt-1">
                  The Developer
                </span>
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center">
                        <div className="ml-10 flex items-center space-x-1">
                            {navItems.map((item) => {
                                const isActive =
                                    pathname === item.path ||
                                    (item.path !== "/" && pathname.startsWith(item.path));

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className={`
                      group relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                      ${
                                            isActive
                                                ? "text-white"
                                                : "text-slate-300 hover:text-white"
                                        }
                    `}
                                    >
                                        {/* Background effect */}
                                        <span
                                            className={`absolute inset-0 rounded-md transition-all duration-300 ${
                                                isActive
                                                    ? "bg-primary/20 opacity-100"
                                                    : "opacity-0 group-hover:opacity-100 group-hover:bg-dark-100/50"
                                            }`}
                                        />

                                        {/* Content */}
                                        <span className="relative flex items-center gap-1.5">
                      {item.icon}
                                            {item.name}
                    </span>

                                        {/* Active indicator */}
                                        {isActive && (
                                            <span
                                                className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary-light/70 rounded-full"/>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* CTA Button */}
                        <div className="ml-6">
                            <a
                                href="https://github.com/selcuksarikoz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-md bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-colors duration-200 inline-flex items-center gap-1.5 shadow-md shadow-primary/20"
                            >
                                <span className="font-mono">{"<"}</span>
                                GitHub
                                <span className="font-mono">{"/>"}</span>
                            </a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
                        >
              <span className="sr-only">
                {mobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6"/>
                            ) : (
                                <Menu className="h-6 w-6"/>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                    mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 border-t border-dark-100 mt-2">
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.path ||
                            (item.path !== "/" && pathname.startsWith(item.path));

                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`
                  flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-all duration-200
                  ${
                                    isActive
                                        ? "bg-primary/10 text-primary-light border-l-2 border-primary"
                                        : "text-slate-300 hover:bg-dark-100 hover:text-white"
                                }
                `}
                            >
                <span
                    className={`${isActive ? "text-primary" : "text-slate-400"}`}
                >
                  {item.icon}
                </span>
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* Mobile GitHub Link */}
                    <a
                        href="https://github.com/selcuksarikoz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium bg-primary/10 text-primary-light mt-2"
                    >
                        <Code className="h-4 w-4"/>
                        GitHub Profile
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
