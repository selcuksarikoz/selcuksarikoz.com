"use client";

import Skills from "@/src/components/skills";
import Bio from "@/src/components/bio";
import HeroSection from "@/src/components/hero";
import Developments from "@/src/components/development";

// Home Page Component
export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <div className="flex flex-col relative w-full min-h-screen h-full justify-center">
                <HeroSection/>
            </div>

            {/* Content Sections */}
            <div className="flex flex-col gap-20 py-20 max-w-[1280px] w-full mx-auto px-6 sm:px-10">
                {/* Development Areas */}
                <Developments/>

                {/* Bio Section */}
                <Bio/>

                {/* Skills Section */}
                <Skills/>
            </div>
        </>
    );
}
