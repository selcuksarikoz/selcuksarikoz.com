import apps from "../../assets/apps.json";
import {
  ChevronUp,
  Code,
  Cpu,
  Download,
  ExternalLink,
  Globe,
  Layers,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Title } from "@/src/components/title";
import { Metadata } from "next";

// Assuming the same AppModel type
export interface AppModel {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  platforms: {
    os: string;
    url: string;
  }[];
}

export const metadata: Metadata = {
  title: "My Digital Creations",
  description:
    "From web to desktop to mobile — I build the tools I need and share them with you. These passion projects solve real problems I've encountered, and I hope you find them useful too.",
};

export default async function AppsPage(props: any) {
  // Extract filter from search parameters
  const _pageParam = await props?.searchParams;
  const initialFilter = _pageParam?.filter || "all";

  // Filter categories
  const categories = [
    { id: "all", name: "All Apps", icon: <Layers className="w-4 h-4" /> },
    { id: "desktop", name: "Desktop", icon: <Cpu className="w-4 h-4" /> },
    { id: "web", name: "Web", icon: <Globe className="w-4 h-4" /> },
    { id: "mobile", name: "Mobile", icon: <Smartphone className="w-4 h-4" /> },
  ];

  // Function to filter apps (now handled server-side)
  const filterApps = (apps: AppModel[], activeFilter: string | null) => {
    if (activeFilter && activeFilter !== "all") {
      return apps.filter((app) =>
        app.tags.some((tag) =>
          tag.toLowerCase().includes(activeFilter.toLowerCase()),
        ),
      );
    }
    return apps;
  };

  // Initial filtered apps
  const filteredApps = filterApps(apps, initialFilter);

  // Determine tag colors based on category
  const getTagColor = (tag: string): string => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes("desktop")) return "bg-primary/20 text-primary-light";
    if (lowerTag.includes("web")) return "bg-secondary/20 text-secondary-light";
    if (lowerTag.includes("mobile")) return "bg-accent/20 text-accent-light";
    return "bg-dark-100/50 text-gray-300";
  };

  function trackDownload(appName: string, platform: string) {
    if (typeof window == "undefined") return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: `${appName}-${platform}`,
    });
  }

  return (
    <div className="flex flex-col min-h-screen pb-20 pt-30">
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          <Title
            title={"My Digital Creations"}
            description={
              "From web to desktop to mobile — I build the tools I need and share them with you. These passion projects solve real problems I've encountered, and I hope you find them useful too."
            }
          />

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/apps?filter=${category.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  (category.id === "all" && !initialFilter) ||
                  initialFilter === category.id
                    ? "bg-primary/20 text-primary-light border border-primary/30"
                    : "bg-dark-100/50 text-gray-300 border border-gray-700 hover:bg-dark-100 hover:text-white"
                }`}
              >
                {category.icon}
                {category.name}
              </a>
            ))}
          </div>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="group relative bg-dark-50/60 backdrop-blur-sm rounded-xl overflow-hidden border border-dark-100/60 shadow-xl transition-all duration-300 hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-1"
            >
              {/* App Preview Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  width={500}
                  height={280}
                  src={app.imageUrl}
                  alt={app.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>

                {/* App Name */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">{app.name}</h3>
                </div>
              </div>

              {/* App Details */}
              <div className="p-6 flex flex-col">
                <p className="text-gray-300 mb-4 flex-grow">
                  {app.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {app.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-md text-xs font-mono ${getTagColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Platform Dropdown implemented with checkbox */}
                <div className="mt-auto relative">
                  <div className="dropdown">
                    <label className="w-full">
                      <input type="checkbox" className="peer hidden" />
                      <div className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium flex items-center justify-center transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 cursor-pointer">
                        <Download className="mr-2 h-5 w-5" />
                        Download
                        <ChevronUp className="ml-2 h-4 w-4 transition-transform duration-300 peer-checked:rotate-180" />
                      </div>

                      {/* Dropdown Menu */}
                      <div className="absolute z-50 bottom-full mb-2 w-full rounded-lg shadow-lg bg-dark-50 border border-dark-100 hidden peer-checked:block">
                        <div className="py-1">
                          {app.platforms.map((platform) => (
                            <Link
                              key={platform.os}
                              href={platform.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-3 text-gray-300 hover:bg-dark-100 hover:text-white transition-colors flex items-center gap-2"
                            >
                              <Download className="h-4 w-4" />
                              <span>{platform.os}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-[10]">
                <div className="absolute transform rotate-45 bg-gradient-to-br from-primary/90 to-primary/90 text-white text-xs py-1 right-[-35px] top-[14px] w-[120px] text-center">
                  App
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results State */}
        {filteredApps.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-dark-100 mb-4">
              <Code className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Apps Found</h3>
            <p className="text-gray-400">
              No apps match your selected filter. Try changing the filter.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-br from-dark-50 to-dark rounded-xl border border-dark-100/60 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Looking for a Custom Solution?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            If you like my apps and need custom development work, I&#39;m
            available for freelance projects and consulting.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          >
            <ExternalLink className="h-5 w-5" />
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
