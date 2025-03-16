"use client";

import { useEffect, useRef, useState } from "react";
import { Code, Database, Layout, Server, Smartphone, Zap } from "lucide-react";

interface Skill {
    name: string;
    category: "frontend" | "backend" | "mobile" | "database" | "devops" | "other";
    level: "expert" | "advanced" | "intermediate";
}

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Define skill categories with icons
    const categories = [
        {id: "frontend", name: "Frontend", icon: <Layout className="w-5 h-5"/>},
        {id: "backend", name: "Backend", icon: <Server className="w-5 h-5"/>},
        {id: "mobile", name: "Mobile", icon: <Smartphone className="w-5 h-5"/>},
        {
            id: "database",
            name: "Database",
            icon: <Database className="w-5 h-5"/>,
        },
        {id: "devops", name: "DevOps", icon: <Zap className="w-5 h-5"/>},
        {id: "other", name: "Other", icon: <Code className="w-5 h-5"/>},
    ];

    // Skills data organized by category
    const skills: Skill[] = [
        // Frontend
        {name: "TypeScript", category: "frontend", level: "expert"},
        {name: "React", category: "frontend", level: "expert"},
        {name: "Next.js", category: "frontend", level: "expert"},
        {name: "Vue.js", category: "frontend", level: "expert"},
        {name: "Nuxt.js", category: "frontend", level: "expert"},
        {name: "Angular", category: "frontend", level: "advanced"},
        {name: "HTML/CSS", category: "frontend", level: "expert"},
        {name: "Tailwind", category: "frontend", level: "expert"},
        {name: "JavaScript", category: "frontend", level: "expert"},
        {name: "Bootstrap", category: "frontend", level: "expert"},

        // Backend
        {name: "Node.js", category: "backend", level: "advanced"},
        {name: "Express", category: "backend", level: "advanced"},
        {name: "Fastify", category: "backend", level: "advanced"},
        {name: "Nest.js", category: "backend", level: "expert"},
        {name: "Laravel", category: "backend", level: "advanced"},
        {name: "PHP", category: "backend", level: "advanced"},
        {name: "RESTful APIs", category: "backend", level: "expert"},
        {name: "GraphQL", category: "backend", level: "expert"},

        // Mobile
        {name: "React Native", category: "mobile", level: "expert"},
        {name: "Kotlin", category: "mobile", level: "advanced"},
        {name: "Mobile UX", category: "mobile", level: "advanced"},

        // Database
        {name: "MySQL", category: "database", level: "intermediate"},
        {name: "PostgreSQL", category: "database", level: "advanced"},
        {name: "MongoDB", category: "database", level: "advanced"},
        {name: "Redis", category: "database", level: "advanced"},

        // DevOps
        {name: "AWS", category: "devops", level: "intermediate"},
        {name: "Google Cloud", category: "devops", level: "intermediate"},
        {name: "Docker", category: "devops", level: "intermediate"},

        // Other
        {name: "Project Management", category: "other", level: "expert"},
    ];

    // Calculate selected skills based on active category
    const selectedSkills = activeCategory
        ? skills.filter((skill) => skill.category === activeCategory)
        : skills;

    // Track mouse position for interactive elements
    useEffect(() => {
        if (!containerRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        const container = containerRef.current;
        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Calculate distance from mouse for each tag to create the follow effect
    const getTagStyle = (index: number) => {
        if (!containerRef.current) return {};

        // Improved tag positioning with better distribution
        // Use golden ratio for more natural distribution
        const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees in radians

        // Calculate a unique angle for each tag
        const angle = index * goldenAngle;

        // Vary the radius based on index to create layers
        const layerIndex = index % 3; // Create 3 distinct layers
        const layerMultiplier = [1, 0.65, 0.3][layerIndex]; // Vary distance from center

        // Use a larger base radius to give more space between tags
        const baseRadius = 200;
        const radius = baseRadius * (0.6 + layerMultiplier * 0.5);

        // Calculate initial position with varying radiuses for x and y to create an elliptical distribution
        const baseX = Math.cos(angle) * radius * 0.85;
        const baseY = Math.sin(angle) * radius * 0.6;

        // Calculate center of the container
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate mouse influence (stronger when closer to the tag)
        const tagX = centerX + baseX;
        const tagY = centerY + baseY;
        const dx = mousePosition.x - tagX;
        const dy = mousePosition.y - tagY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200; // Increased max distance for influence

        // Calculate the push effect based on distance
        const pushFactor = Math.max(0, 1 - distance / maxDistance) * 40;
        const pushX = (dx * pushFactor) / distance || 0;
        const pushY = (dy * pushFactor) / distance || 0;

        // Calculate scale factor based on level
        const level = selectedSkills[index]?.level;
        const scaleFactor =
            level === "expert" ? 1.2 : level === "advanced" ? 1 : 0.85;

        // Final position with a bit of randomness to prevent perfectly regular patterns
        const randomOffsetX = Math.sin(index * 0.5) * 15;
        const randomOffsetY = Math.cos(index * 0.5) * 15;
        const finalX = baseX - pushX + randomOffsetX;
        const finalY = baseY - pushY + randomOffsetY;

        return {
            transform: `translate(${finalX}px, ${finalY}px) scale(${scaleFactor})`,
            transition: "transform 0.3s ease-out",
            zIndex: distance < 50 ? 10 : 1,
        };
    };

    // Get color based on skill level
    const getTagColor = (level: Skill["level"]) => {
        switch (level) {
            case "expert":
                return "bg-primary/20 text-primary-light border-primary/30";
            case "advanced":
                return "bg-secondary/20 text-secondary-light border-secondary/30";
            case "intermediate":
                return "bg-accent/20 text-accent-light border-accent/30";
            default:
                return "bg-gray-800/50 text-gray-300 border-gray-700";
        }
    };

    return (
        <div className="w-full py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-2">Tech Stack</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        The technologies I work with to create exceptional digital
                        experiences.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
              ${
                            activeCategory === null
                                ? "bg-primary/20 text-primary-light border border-primary/30"
                                : "bg-dark-100/50 text-gray-300 border border-gray-700 hover:bg-dark-100 hover:text-white"
                        }`}
                        onClick={() => setActiveCategory(null)}
                    >
                        <Code className="w-4 h-4"/>
                        All Skills
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
                ${
                                activeCategory === category.id
                                    ? "bg-primary/20 text-primary-light border border-primary/30"
                                    : "bg-dark-100/50 text-gray-300 border border-gray-700 hover:bg-dark-100 hover:text-white"
                            }`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.icon}
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Interactive Skills Cloud */}
                <div
                    ref={containerRef}
                    className="relative w-full h-[500px] rounded-xl bg-gradient-to-br from-dark-50 to-dark/90 border border-dark-100/50 overflow-hidden p-4"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), rgba(15, 23, 42, 0.9) 50%)`,
                        transition: "background 0.5s ease-out",
                    }}
                >
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden opacity-10">
                        <div
                            className="absolute top-0 left-0 w-full h-16 bg-primary/20 blur-3xl transform -translate-y-12 animate-pulse"
                            style={{animationDuration: "15s"}}
                        ></div>
                        <div
                            className="absolute bottom-0 right-0 w-full h-16 bg-secondary/20 blur-3xl transform translate-y-12 animate-pulse"
                            style={{animationDuration: "20s"}}
                        ></div>
                    </div>

                    {/* Skills Tags */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {selectedSkills.map((skill, index) => (
                            <div
                                key={skill.name}
                                className={`absolute px-4 py-2 rounded-full border ${getTagColor(skill.level)} font-mono whitespace-nowrap cursor-pointer transition-all duration-300 hover:shadow-glow backdrop-blur-sm`}
                                style={{
                                    ...getTagStyle(index),
                                    minWidth: "80px", // Ensure minimum width for tiny tags
                                    textAlign: "center",
                                }}
                            >
                                {skill.name}
                            </div>
                        ))}
                    </div>

                    {/* Center Circle */}
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-dark-50 border border-primary/30 flex items-center justify-center shadow-glow z-0 animate-pulse-slow">
                        <Code className="h-10 w-10 text-primary"/>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-8 mt-8">
                    <div className="flex items-center gap-3">
                        <div
                            className="px-3 py-1.5 rounded-full bg-primary/20 text-primary-light border border-primary/30 text-sm font-mono">
                            Expert
                        </div>
                        <span className="text-sm text-gray-400">High proficiency</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div
                            className="px-3 py-1.5 rounded-full bg-secondary/20 text-secondary-light border border-secondary/30 text-sm font-mono">
                            Advanced
                        </div>
                        <span className="text-sm text-gray-400">Strong knowledge</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div
                            className="px-3 py-1.5 rounded-full bg-accent/20 text-accent-light border border-accent/30 text-sm font-mono">
                            Intermediate
                        </div>
                        <span className="text-sm text-gray-400">Working knowledge</span>
                    </div>
                </div>

                <div className="text-center mt-6 text-gray-500 text-sm">
                    <p>
                        Hover over the cloud and move your mouse to interact with the skills
                    </p>
                </div>
            </div>
        </div>
    );
}
