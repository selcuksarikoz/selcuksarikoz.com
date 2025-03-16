"use client";

import { useState, useEffect, useRef } from "react";
import {
    ChevronRight,
    ExternalLink,
    Github,
    Code,
    Terminal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({x: 0.5, y: 0.5});

    // List of technologies to cycle through
    const technologies = [
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Laravel",
        "Kotlin",
    ];

    // Terminal text animation state
    const [terminalText, setTerminalText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    // Technology typewriter state
    const [typedTech, setTypedTech] = useState("");

    // Handle interactive background effect
    useEffect(() => {
        if (!heroRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Get normalized mouse position (0 to 1)
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            setMousePosition({x, y});
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Handle terminal text typing animation
    useEffect(() => {
        // Text to type out in terminal
        const fullText = `> const developer = {
  name: "Selcuk S.",
  location: "Berlin",
  skills: ["frontend", "backend", "mobile"],
  passion: "Building innovative solutions"
} as const;`;

        let i = 0;
        const typingInterval = setInterval(() => {
            if (i <= fullText.length) {
                setTerminalText(fullText.slice(0, i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 40);

        // Blinking cursor effect
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => {
            clearInterval(typingInterval);
            clearInterval(cursorInterval);
        };
    }, []);

    // Simple technology typewriter effect
    useEffect(() => {
        let techIndex = 0;
        let isDeleting = false;
        let text = "";

        const tick = () => {
            const currentTech = technologies[techIndex];

            // Full text when complete, slice of tech when typing/deleting
            text = isDeleting
                ? currentTech.substring(0, text.length - 1)
                : currentTech.substring(0, text.length + 1);

            setTypedTech(text);

            // Typing speed control
            let speed = isDeleting ? 50 : 150;

            // If finished typing
            if (!isDeleting && text === currentTech) {
                speed = 1500; // Pause at end
                isDeleting = true;
            }
            // If finished deleting
            else if (isDeleting && text === "") {
                isDeleting = false;
                techIndex = (techIndex + 1) % technologies.length;
                speed = 500; // Pause before next word
            }

            setTimeout(tick, speed);
        };

        // Start the typewriter effect
        const timer = setTimeout(tick, 1000);

        return () => clearTimeout(timer);

        // @ts-ignore
    }, []);

    return (
        <div
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: `radial-gradient(
          circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
          rgba(99, 102, 241, 0.15),
          rgba(15, 23, 42, 0.95) 40%
        )`,
            }}
        >
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                               linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                        backgroundSize: "50px 50px",
                        transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px)`,
                        transition: "transform 0.2s ease-out",
                    }}
                />
            </div>

            <div className="container mx-auto px-6 py-12 z-10 relative flex flex-col items-center">
                {/* Developer Badge */}
                <div
                    className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary-light border border-primary/20 text-sm font-mono mb-8">
                    <Code className="w-4 h-4 mr-2"/>
                    <span>Full-stack Developer</span>
                </div>

                {/* Terminal Window */}
                <div className="relative max-w-2xl w-full mb-8">
                    <div
                        className="relative z-10 bg-code-bg rounded-lg overflow-hidden border border-gray-700 shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/20"
                        style={{
                            transform: `perspective(1000px) rotateY(${(mousePosition.x - 0.5) * -5}deg) rotateX(${(mousePosition.y - 0.5) * 5}deg)`,
                        }}
                    >
                        {/* Terminal Header */}
                        <div
                            className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Terminal className="h-4 w-4 text-gray-400"/>
                                <span className="text-xs text-gray-400 font-mono">
                  developer.sh
                </span>
                            </div>
                            <div className="w-16"></div>
                        </div>

                        {/* Terminal Content */}
                        <div className="p-6 font-mono text-sm h-72 overflow-hidden">
                            <p className="text-gray-400 mb-4">$ whoami</p>
                            <p className="text-code-text mb-4">selcuk@berlin:~</p>
                            <p className="text-gray-400 mb-4">$ node developer.js</p>

                            <div className="text-code-text whitespace-pre-wrap">
                                {terminalText}
                                {showCursor && (
                                    <span className="inline-block w-2 h-4 bg-code-text ml-0.5 animate-pulse"></span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div
                        className="absolute -bottom-6 -right-6 z-20 h-32 w-32 rounded-full overflow-hidden border-4 border-dark-50 shadow-xl"
                        style={{
                            transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`,
                            transition: "transform 0.3s ease-out",
                        }}
                    >
                        <Image
                            width={128}
                            height={128}
                            src="/images/selcuk.jpeg"
                            alt="Selcuk S."
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                {/* Main Heading - Below Terminal */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-center">
                    Crafting
                    <span className="relative whitespace-nowrap mx-3">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              digital experiences
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/20 rounded-full blur-sm"></span>
          </span>
                    with code
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-300 mb-8 max-w-lg text-center">
                    Specializing in frontend, backend, and mobile development. Creating
                    innovative solutions with
                    <span className="relative inline-block mx-2 px-3 py-0.5 min-w-24 text-center">
            <span className="relative z-10 font-mono text-secondary-light">
              {typedTech}
                <span className="inline-block w-1.5 h-4 bg-secondary-light ml-0.5 animate-pulse"></span>
            </span>
            <span className="absolute inset-0 bg-secondary/10 rounded-md"></span>
          </span>
                    for modern challenges.
                </p>

                {/* Call-to-Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center mb-8">
                    <Link
                        href="/apps"
                        className="px-5 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium flex items-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                    >
                        Explore My Apps
                        <ChevronRight className="h-5 w-5"/>
                    </Link>

                    <Link
                        href="/contact"
                        className="px-5 py-3 bg-dark-100/80 hover:bg-dark-100 text-white rounded-lg font-medium flex items-center gap-2 transition-all border border-dark-100 hover:border-gray-600"
                    >
                        Get In Touch
                        <ExternalLink className="h-4 w-4"/>
                    </Link>
                </div>

                {/* Github Link */}
                <div className="flex items-center justify-center text-gray-400 text-sm">
                    <a
                        href="https://github.com/selcuksarikoz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                        <Github className="h-4 w-4"/>
                        <span>github.com/selcuksarikoz</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
