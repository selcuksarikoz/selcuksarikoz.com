"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Film, Code, Globe } from "lucide-react";
import Image from "next/image";

const Bio = () => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const [activeTimelineItem, setActiveTimelineItem] = useState(0);

    // Timeline events
    const timeline = [
        {
            year: "1987",
            title: "Born in Istanbul",
            description: "My journey began in Istanbul, Turkey",
            icon: <Globe className="h-5 w-5"/>,
            color: "from-blue-400 to-indigo-500",
        },
        {
            year: "1995",
            title: "First Computer",
            description:
                "Discovered computers at age 8, beginning a lifelong fascination with technology",
            icon: <Code className="h-5 w-5"/>,
            color: "from-teal-400 to-emerald-500",
        },
        {
            year: "2002",
            title: "Started Coding",
            description: "Began programming with Visual Basic and PHP at age 15",
            icon: <Code className="h-5 w-5"/>,
            color: "from-purple-400 to-indigo-500",
        },
        {
            year: "Now",
            title: "Based in Germany",
            description: "Working as a full-stack developer in Berlin",
            icon: <Globe className="h-5 w-5"/>,
            color: "from-primary to-primary-hover",
        },
    ];

    // Intersection observer for timeline
    useEffect(() => {
        if (!timelineRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    // Start animation when visible
                    const items = timelineRef.current?.querySelectorAll(".timeline-item");
                    items?.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.remove("opacity-0");
                            item.classList.remove("translate-y-4");

                            // Highlight first item after all are visible
                            if (index === items.length - 1) {
                                setTimeout(() => setActiveTimelineItem(0), 500);
                            }
                        }, index * 400);
                    });
                }
            },
            {threshold: 0.3},
        );

        observer.observe(timelineRef.current);

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (timelineRef.current) observer.unobserve(timelineRef.current!);
        };
    }, []);

    // Auto rotate through timeline items
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTimelineItem((prev) => (prev + 1) % timeline.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [timeline.length]);

    return (
        <div className="w-full py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-2">About Me</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        My journey from Istanbul to Berlin and from curiosity to code.
                    </p>
                </div>

                <div
                    className="relative bg-dark-50/70 backdrop-blur-sm rounded-2xl border border-dark-100/40 shadow-xl overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div
                            className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    </div>

                    <div className="relative flex flex-col lg:flex-row gap-8 p-8">
                        {/* Profile Image Column */}
                        <div className="lg:w-1/3">
                            <div className="relative mx-auto lg:mx-0 max-w-xs">
                                {/* Image with frame */}
                                <div
                                    className="relative rounded-2xl overflow-hidden border-2 border-dark-100/60 shadow-2xl">
                                    <div className="aspect-square overflow-hidden">
                                        <Image
                                            src="/images/selcuk-2.jpeg"
                                            alt="Selcuk Sarikoz"
                                            className="w-full h-full object-cover"
                                            width={300}
                                            height={300}
                                        />
                                    </div>

                                    {/* Image overlay gradients */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>

                                    {/* Code badge */}
                                    <div
                                        className="absolute top-4 right-4 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-lg py-1 px-3 text-xs font-mono text-primary-light">
                    <span className="flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5"/>
                      developer
                    </span>
                                    </div>
                                </div>

                                {/* Social links */}
                                <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-3">
                                    <a
                                        href="https://unsplash.com/@selcukss"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-dark-100/60 hover:bg-dark-100 px-3 py-2 rounded-lg transition-colors border border-dark-100/60 hover:border-gray-600"
                                    >
                                        <Camera className="h-4 w-4 text-blue-400"/>
                                        <span className="text-sm text-gray-300">Unsplash</span>
                                    </a>

                                    <a
                                        href="https://www.pexels.com/@selcukss/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-dark-100/60 hover:bg-dark-100 px-3 py-2 rounded-lg transition-colors border border-dark-100/60 hover:border-gray-600"
                                    >
                                        <Film className="h-4 w-4 text-green-400"/>
                                        <span className="text-sm text-gray-300">Pexels</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Bio Content */}
                        <div className="lg:w-2/3">
                            <div className="prose prose-lg prose-invert max-w-none">
                                <p className="text-gray-300 leading-relaxed">
                                    My tech adventure began in Istanbul, where I was born in 1987.
                                    At just 8 years old, I discovered computers—a discovery that
                                    would shape my entire future. By 15, I was already coding and
                                    building applications, starting with Visual Basic and PHP.
                                </p>

                                <p className="text-gray-300 leading-relaxed">
                                    That early passion has carried me to Germany, where I continue
                                    to push the boundaries of what's possible with code. When I'm
                                    not programming, you'll find me capturing moments through
                                    photography or enjoying cinema.
                                </p>
                            </div>

                            {/* Timeline */}
                            <div ref={timelineRef} className="mt-16">
                                <h3 className="text-xl font-bold mb-10 text-white">
                                    My Journey
                                </h3>

                                {/* New Timeline Layout */}
                                <div className="relative">
                                    {/* Timeline connecting line */}
                                    <div className="absolute inset-0 flex justify-center">
                                        <div
                                            className="w-1 bg-gradient-to-b from-primary/30 via-secondary/30 to-accent/30 rounded-full"></div>
                                    </div>

                                    {/* Timeline Events */}
                                    <div className="relative z-10 space-y-20">
                                        {timeline.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`timeline-item relative flex ${
                                                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                                                } items-center opacity-0 translate-y-4 transition-all duration-500`}
                                                onClick={() => setActiveTimelineItem(index)}
                                            >
                                                {/* Content Box - Left or Right */}
                                                <div
                                                    className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}
                                                >
                                                    <div
                                                        className={`
                              p-5 inline-block rounded-xl transition-all duration-300
                              ${
                                                            activeTimelineItem === index
                                                                ? "bg-dark-100/60 border border-primary/20 shadow-glow-sm"
                                                                : "bg-dark-100/30 border border-dark-100/30"
                                                        }
                            `}
                                                    >
                                                        <div className="font-mono text-sm text-primary-light mb-2">
                                                            {item.year}
                                                        </div>
                                                        <h4 className="text-lg font-medium text-white mb-1">
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-gray-400 text-sm">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Center Timeline Node */}
                                                <div className="w-2/12 flex justify-center">
                                                    <div
                                                        className={`
                              w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300
                              ${
                                                            activeTimelineItem === index
                                                                ? "bg-gradient-to-br from-primary to-primary-dark scale-110 shadow-glow-sm"
                                                                : "bg-dark-100 border border-dark-100/50"
                                                        }
                            `}
                                                    >
                                                        <div
                                                            className={`transition-all duration-300 text-white ${activeTimelineItem === index ? "scale-110" : "opacity-70"}`}
                                                        >
                                                            {item.icon}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Empty space for alternating layout */}
                                                <div className="w-5/12"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bio;
