import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const defaultUrls: string[] = [
  "/",
  "/apps",
  "/blog",
  "/contact",
  "/photography",
  "/clipmind",
];

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  const domain: string = "https://www.selcuksarikoz.com";
  const today: string = new Date().toISOString().split("T")[0];

  // Try to discover routes first
  let discoveredRoutes: string[] = [];
  try {
    discoveredRoutes = getPageRoutesFromFileSystem();
  } catch (error) {
    console.error("Error discovering routes:", error);
  }

  // Use discovered routes if we found any, otherwise fall back to default
  let routes: string[] =
    discoveredRoutes.length > 0 ? discoveredRoutes : defaultUrls;

  const sitemap: string = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route: string) => `
  <url>
    <loc>${domain}${route === "/" ? "" : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

function getPageRoutesFromFileSystem(): string[] {
  // Get the current working directory
  const cwd: string = process.cwd();

  // Check both App Router and Pages Router paths
  const appDir: string = path.join(cwd, "src", "app");
  const pagesDir: string = path.join(cwd, "src", "pages");

  // Array to store discovered routes
  const routes: string[] = [];

  // Try to scan App Router first (Next.js 13+)
  if (fs.existsSync(appDir)) {
    scanAppDirectory(appDir, routes);
  }

  // Also check Pages Router (Next.js 12 and older)
  if (fs.existsSync(pagesDir)) {
    scanPagesDirectory(pagesDir, routes);
  }

  // If no routes found, log a warning
  if (routes.length === 0) {
    return defaultUrls;
  }

  // Clean up routes (remove duplicates, normalize slashes)
  const cleanedRoutes: string[] = [...new Set(routes)]
    .map((route: string) => route.replace(/\/\//g, "/"))
    .filter((route: string) => route)
    .map((route: string) => (route === "//" ? "/" : route));

  return cleanedRoutes;
}

// Function to scan App Router directory structure (app/*)
function scanAppDirectory(
  dir: string,
  routes: string[],
  currentRoute: string = "/",
): void {
  try {
    const files: string[] = fs.readdirSync(dir);

    // Check if this directory contains a page file
    const hasPage: boolean = files.some((file: string) => {
      const isPageFile: boolean =
        file === "page.js" ||
        file === "page.jsx" ||
        file === "page.ts" ||
        file === "page.tsx";
      if (isPageFile) console.log(`Found page file in ${dir}: ${file}`);
      return isPageFile;
    });

    // If we found a page file, add its route
    if (hasPage) {
      routes.push(currentRoute);
    }

    // Recursively scan subdirectories
    for (const file of files) {
      const filePath: string = path.join(dir, file);

      // Skip if it's not a directory or is a special directory
      if (!fs.statSync(filePath).isDirectory()) continue;
      if (
        file === "api" ||
        file.startsWith("_") ||
        file.startsWith(".") ||
        file === "components" ||
        file === "lib" ||
        file === "utils"
      ) {
        continue;
      }

      // Handle route segments
      let routeSegment: string = file;
      let isDynamic: boolean = false;

      // Check if it's a dynamic route
      if (file.startsWith("[") && file.endsWith("]")) {
        // We could include dynamic routes with placeholder values if needed
        // For now, just skip them
        isDynamic = true;
        continue;
      }

      // Build the new route
      const newRoute: string =
        currentRoute === "/"
          ? `/${routeSegment}`
          : `${currentRoute}/${routeSegment}`;

      scanAppDirectory(filePath, routes, newRoute);
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }
}

// Function to scan Pages Router directory structure (pages/*)
function scanPagesDirectory(
  dir: string,
  routes: string[],
  currentRoute: string = "/",
): void {
  try {
    const files: string[] = fs.readdirSync(dir);

    for (const file of files) {
      const filePath: string = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Skip special directories
        if (
          file === "api" ||
          file.startsWith("_") ||
          file.startsWith(".") ||
          file === "components" ||
          file === "lib" ||
          file === "utils"
        ) {
          continue;
        }

        // Build the new route
        const newRoute: string =
          currentRoute === "/" ? `/${file}` : `${currentRoute}/${file}`;

        scanPagesDirectory(filePath, routes, newRoute);
      } else if (
        stat.isFile() &&
        /\.(js|jsx|ts|tsx)$/.test(file) &&
        !file.startsWith("_")
      ) {
        // Handle index files and normal page files
        let routePath: string = currentRoute;

        if (
          file === "index.js" ||
          file === "index.jsx" ||
          file === "index.ts" ||
          file === "index.tsx"
        ) {
          // Index file represents current route
        } else {
          // Non-index file adds to route
          const routeName: string = file.replace(/\.(js|jsx|ts|tsx)$/, "");

          // Skip dynamic pages
          if (routeName.includes("[")) {
            continue;
          }

          routePath =
            currentRoute === "/"
              ? `/${routeName}`
              : `${currentRoute}/${routeName}`;
        }

        routes.push(routePath);
      }
    }
  } catch (error) {
    console.error(`Error scanning pages directory ${dir}:`, error);
  }
}
