import Image from "next/image";
import { Title } from "@/src/components/title";

// TypeScript interfaces
interface PhotoTag {
  type: string;
  title: string;
}

interface Photo {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: null | string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  user: {
    id: string;
    username: string;
    name: string;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string | null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
  };
  tags: PhotoTag[] | null;
}

// Add metadata for SEO
export async function generateMetadata() {
  const { photos } = await getPhotos(1, 1); // Just get one photo for metadata

  // Extract unique tags from the first photo for keywords
  const tags = photos[0]?.tags?.map((tag) => tag.title) || [];

  return {
    title: "Photography Portfolio - Capturing Moments in Time",
    description:
      "Explore my photography portfolio showcasing stunning images that capture the extraordinary in everyday moments.",
    keywords: ["photography", "portfolio", "unsplash", ...tags],
    openGraph: {
      title: "Photography Portfolio - Capturing Moments in Time",
      description:
        "Explore my photography portfolio showcasing stunning images that capture the extraordinary in everyday moments.",
      images: photos[0]?.urls.regular,
    },
  };
}

// Server-side data fetching
async function getPhotos(
  page: number = 1,
  perPage: number = 12,
): Promise<{ photos: Photo[]; totalPages: number }> {
  // Use the provided Unsplash API key
  const UNSPLASH_ACCESS_KEY = process.env.NEXT_UNSPLASH_ACCESS_KEY;

  // Get user photos with pagination
  const url = `https://api.unsplash.com/users/selcukss/photos?page=${page}&per_page=${perPage}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
    next: { revalidate: 2592000 }, // Cache for 1 month (30 days * 24 hours * 60 minutes * 60 seconds)
  });

  if (!response.ok) {
    return {
      photos: [],
      totalPages: 0,
    };
  }

  const photos = await response.json();

  // Get total count from headers
  const totalCount = parseInt(response.headers.get("x-total") || "0", 10);
  const totalPages = Math.ceil(totalCount / perPage);

  // Trigger download endpoint when a photo is loaded
  for (const photo of photos) {
    // On the server side, we can fetch the download endpoint to track downloads
    // This is done automatically when photos are loaded
    if (photo.links.download_location) {
      try {
        await fetch(photo.links.download_location, {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        });
      } catch (error) {
        console.error("Error triggering download endpoint:", error);
      }
    }
  }

  return { photos, totalPages };
}

// Helper function to create masonry columns
function createMasonryColumns(photos: Photo[], columnCount: number) {
  const columns: Photo[][] = Array.from({ length: columnCount }, () => []);

  photos.forEach((photo, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].push(photo);
  });

  return columns;
}

export default async function Photography(props: any) {
  // Get page from query params or default to 1
  const _pageParam = await props?.searchParams;
  const pageParam = _pageParam?.page || 1;

  const pageNumber = pageParam
    ? typeof pageParam === "string"
      ? parseInt(pageParam, 10)
      : parseInt(pageParam[0], 10)
    : 1;

  // Make sure page is a valid number
  const page = isNaN(pageNumber) ? 1 : pageNumber;
  const perPage = 12; // Number of photos per page

  const { photos, totalPages } = await getPhotos(page, perPage);

  // Create columns for masonry layout - 3 columns on larger screens, 2 on medium
  const columnsLarge = createMasonryColumns(photos, 3);
  const columnsMedium = createMasonryColumns(photos, 2);

  return (
    <div className="min-h-screen bg-dark pb-20 pt-30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Title
            title={"Capturing Moments in Time"}
            description={
              "I explore the world through my lens, seeking out the extraordinary in the ordinary. Each photograph tells a story, freezing a fleeting moment into a lasting memory."
            }
          />
          <p className="text-gray-400 mt-4">
            Photos powered by{" "}
            <a
              href="https://unsplash.com?utm_source=photography-portfolio&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-light hover:underline"
            >
              Unsplash
            </a>
          </p>
        </div>

        {/* Masonry Grid - Large Screens (3 columns) */}
        <div className="hidden lg:grid grid-cols-3 gap-4">
          {columnsLarge.map((column, columnIndex) => (
            <div key={`col-lg-${columnIndex}`} className="flex flex-col gap-4">
              {column.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <Image
                    src={photo.urls.small}
                    alt={generateAltText(photo)}
                    width={400}
                    height={400 * (photo.height / photo.width)}
                    className="w-full h-auto"
                    style={{ aspectRatio: `${photo.width}/${photo.height}` }}
                    decoding={"async"}
                    loading={"lazy"}
                  />

                  {/* Overlay with info, tags, and attribution */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-sm font-medium truncate">
                      {photo.description || "Selcuk Sarikoz's Photography"}
                    </p>
                    <p className="text-gray-300 text-xs">
                      Photo by{" "}
                      <a
                        href={`https://unsplash.com/@${photo.user.username}?utm_source=photography-portfolio&utm_medium=referral`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-light hover:underline"
                      >
                        {photo.user.name}
                      </a>{" "}
                      on{" "}
                      <a
                        href="https://unsplash.com?utm_source=photography-portfolio&utm_medium=referral"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-light hover:underline"
                      >
                        Unsplash
                      </a>
                    </p>

                    {/* Tags */}
                    {photo.tags && photo.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {photo.tags.slice(0, 3).map((tag) => (
                          <span
                            key={`${photo.id}-${tag.title}`}
                            className="px-2 py-0.5 text-xs bg-primary/20 text-primary-light rounded-full"
                          >
                            {tag.title}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-3">
                      <a
                        href={`${photo.links.html}?utm_source=photography-portfolio&utm_medium=referral`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                      >
                        View on Unsplash
                      </a>
                      <a
                        href={`${photo.links.download}?utm_source=photography-portfolio&utm_medium=referral`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-xs bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Masonry Grid - Medium Screens (2 columns) */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
          {columnsMedium.map((column, columnIndex) => (
            <div key={`col-md-${columnIndex}`} className="flex flex-col gap-4">
              {column.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <Image
                    src={photo.urls.small}
                    alt={generateAltText(photo)}
                    width={400}
                    height={400 * (photo.height / photo.width)}
                    className="w-full h-auto"
                    style={{ aspectRatio: `${photo.width}/${photo.height}` }}
                    decoding={"async"}
                    loading={"lazy"}
                  />

                  {/* Overlay with info, tags, and attribution */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-sm font-medium truncate">
                      {photo.description || "Selcuk Sarikoz's Photography"}
                    </p>
                    <p className="text-gray-300 text-xs">
                      Photo by{" "}
                      <a
                        href={`https://unsplash.com/@${photo.user.username}?utm_source=photography-portfolio&utm_medium=referral`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-light hover:underline"
                      >
                        {photo.user.name}
                      </a>{" "}
                      on{" "}
                      <a
                        href="https://unsplash.com?utm_source=photography-portfolio&utm_medium=referral"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-light hover:underline"
                      >
                        Unsplash
                      </a>
                    </p>

                    {/* Tags */}
                    {photo.tags && photo.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {photo.tags.slice(0, 3).map((tag) => (
                          <span
                            key={`${photo.id}-${tag.title}`}
                            className="px-2 py-0.5 text-xs bg-primary/20 text-primary-light rounded-full"
                          >
                            {tag.title}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-3">
                      <a
                        href={`${photo.links.html}?utm_source=photography-portfolio&utm_medium=referral`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                      >
                        View on Unsplash
                      </a>
                      <a
                        href={`${photo.links.download}?utm_source=photography-portfolio&utm_medium=referral`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-xs bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Small Screens (single column) */}
        <div className="md:hidden space-y-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <Image
                src={photo.urls.small}
                alt={generateAltText(photo)}
                width={400}
                height={400 * (photo.height / photo.width)}
                className="w-full h-auto"
                style={{ aspectRatio: `${photo.width}/${photo.height}` }}
                decoding={"async"}
                loading={"lazy"}
              />

              {/* Overlay with info, tags, and attribution */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm font-medium truncate">
                  {photo.description || "Selcuk Sarikoz's Photography"}
                </p>
                <p className="text-gray-300 text-xs">
                  Photo by{" "}
                  <a
                    href={`https://unsplash.com/@${photo.user.username}?utm_source=photography-portfolio&utm_medium=referral`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-light hover:underline"
                  >
                    {photo.user.name}
                  </a>{" "}
                  on{" "}
                  <a
                    href="https://unsplash.com?utm_source=photography-portfolio&utm_medium=referral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-light hover:underline"
                  >
                    Unsplash
                  </a>
                </p>

                {/* Tags */}
                {photo.tags && photo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {photo.tags.slice(0, 3).map((tag) => (
                      <span
                        key={`${photo.id}-${tag.title}`}
                        className="px-2 py-0.5 text-xs bg-primary/20 text-primary-light rounded-full"
                      >
                        {tag.title}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-2 mt-3">
                  <a
                    href={`${photo.links.html}?utm_source=photography-portfolio&utm_medium=referral`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    View on Unsplash
                  </a>
                  <a
                    href={`${photo.links.download}?utm_source=photography-portfolio&utm_medium=referral`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="mt-16 flex justify-center items-center gap-2">
          {page > 1 && (
            <a
              href={`/photography?page=${page - 1}`}
              className="px-4 py-2 rounded-lg bg-dark-100/50 text-gray-300 border border-gray-700 hover:bg-dark-100 hover:text-white transition-all"
            >
              Previous
            </a>
          )}

          <div className="flex items-center gap-1 px-4">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum = page;
              if (page <= 3) {
                // At the start, show first 5 pages
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                // At the end, show last 5 pages
                pageNum = totalPages - 4 + i;
              } else {
                // In the middle, show 2 before and 2 after current page
                pageNum = page - 2 + i;
              }

              // Only show valid page numbers
              if (pageNum < 1 || pageNum > totalPages) return null;

              return (
                <a
                  key={pageNum}
                  href={`/photography?page=${pageNum}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                    pageNum === page
                      ? "bg-primary/20 text-primary-light border border-primary/30"
                      : "bg-dark-100/50 text-gray-300 border border-gray-700 hover:bg-dark-100 hover:text-white"
                  }`}
                >
                  {pageNum}
                </a>
              );
            })}

            {totalPages > 5 && page < totalPages - 2 && (
              <>
                <span className="px-1 text-gray-500">...</span>
                <a
                  href={`/photography?page=${totalPages}`}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-dark-100/50 text-gray-300 border border-gray-700 hover:bg-dark-100 hover:text-white transition-all"
                >
                  {totalPages}
                </a>
              </>
            )}
          </div>

          {page < totalPages && (
            <a
              href={`/photography?page=${page + 1}`}
              className="px-4 py-2 rounded-lg bg-dark-100/50 text-gray-300 border border-gray-700 hover:bg-dark-100 hover:text-white transition-all"
            >
              Next
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function generateAltText(photo: Photo) {
  const alt = [];

  if (photo.alt_description) {
    alt.push(photo.alt_description);
  }

  if (photo.description && photo.description !== photo.alt_description) {
    alt.push(photo.description);
  }

  // Add tags if they exist and there's no description or alt_description
  if (alt.length === 0 && photo.tags && photo.tags.length > 0) {
    const tagTitles = photo.tags.slice(0, 3).map((tag) => tag.title);
    alt.push(`Photo of ${tagTitles.join(", ")}`);
  }

  // Use default if nothing else is available
  return alt.length > 0 ? alt.join(" - ") : "Selcuk Sarikoz's Photography";
}
