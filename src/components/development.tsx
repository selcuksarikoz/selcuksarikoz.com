"use client";

import { useState } from "react";
import { Monitor, Server, Smartphone, ChevronRight } from "lucide-react";

export default function Developments() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const developmentAreas = [
        {
            title: "Frontend Development",
            description:
                "Creating responsive and interactive user interfaces with modern frameworks.",
            skills: ["React", "Vue.js", "Angular", "Next.js", "Nuxt.js"],
            icon: <Monitor className="w-6 h-6"/>,
            gradient: "from-primary to-primary-light",
            iconBg: "bg-primary/10",
            iconBorder: "border-primary/20",
            iconColor: "text-primary-light",
            hoverGlow: "group-hover:shadow-primary/20",
        },
        {
            title: "Backend Development",
            description:
                "Building robust APIs and server applications with scalable architectures.",
            skills: ["Node.js", "Laravel", "Express", "Nest.js", "GraphQL"],
            icon: <Server className="w-6 h-6"/>,
            gradient: "from-secondary to-secondary-light",
            iconBg: "bg-secondary/10",
            iconBorder: "border-secondary/20",
            iconColor: "text-secondary-light",
            hoverGlow: "group-hover:shadow-secondary/20",
        },
        {
            title: "Mobile Development",
            description:
                "Developing cross-platform mobile applications for iOS and Android.",
            skills: ["React Native", "Kotlin", "Flutter", "Expo", "Mobile UX"],
            icon: <Smartphone className="w-6 h-6"/>,
            gradient: "from-accent to-accent-light",
            iconBg: "bg-accent/10",
            iconBorder: "border-accent/20",
            iconColor: "text-accent-light",
            hoverGlow: "group-hover:shadow-accent/20",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentAreas.map((area) => (
                <div
                    key={area.title}
                    className="group relative bg-dark-50/70 backdrop-blur-lg p-6 rounded-xl border border-dark-100/40 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
                    onMouseEnter={() => setHoveredCard(area.title)}
                    onMouseLeave={() => setHoveredCard(null)}
                >
                    {/* Animated gradient background */}
                    <div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${area.gradient} transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100`}
                    ></div>

                    {/* Background glow effect */}
                    <div
                        className={`absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br ${area.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-5`}
                    ></div>

                    {/* Icon and title */}
                    <div className="flex items-center mb-4">
                        <div
                            className={`flex-shrink-0 h-12 w-12 ${area.iconBg} ${area.iconColor} rounded-lg border ${area.iconBorder} flex items-center justify-center mr-4 transition-transform duration-300 group-hover:scale-110`}
                        >
                            {area.icon}
                        </div>
                        <h3 className={`text-xl font-bold ${area.iconColor}`}>
                            {area.title}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6">{area.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {area.skills.map((skill, index) => (
                            <span
                                key={skill}
                                className={`px-3 py-1 ${area.iconBg} ${area.iconColor} rounded-full text-sm font-medium border ${area.iconBorder} transition-all duration-300`}
                                style={{
                                    transform:
                                        hoveredCard === area.title ? "scale(1.05)" : "scale(1)",
                                    transitionDelay: `${index * 50}ms`,
                                }}
                            >
                {skill}
              </span>
                        ))}
                    </div>

                    {/* Learn more subtle hint */}
                    <div
                        className={`flex items-center text-sm ${area.iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto`}
                    >
                        <span>Learn more</span>
                        <ChevronRight className="w-4 h-4 ml-1"/>
                    </div>
                </div>
            ))}
        </div>
    );
}
