#!/bin/bash

# Sitemap Generator Script for Next.js Projects
# Usage: ./generate-sitemap.sh

# Configuration
DOMAIN="https://www.selcuksarikoz.com"
OUTPUT_FILE="public/sitemap.xml"
TODAY=$(date +%Y-%m-%d)

# Default routes in case discovery fails
DEFAULT_ROUTES=(
  "/"
  "/apps"
  "/blog"
  "/contact"
  "/photography"
  "/clipmind"
)

# Create directories array
DIRECTORIES=(
  "src/app"
  "src/pages"
)

# Function to discover routes from app directory (Next.js 13+)
discover_app_routes() {
  local dir=$1
  local current_route=$2

  # Check if this directory contains a page file
  if ls "$dir"/page.{js,jsx,ts,tsx} 2>/dev/null | grep -q .; then
    echo "$current_route"
  fi

  # Scan subdirectories
  for subdir in "$dir"/*/; do
    if [ -d "$subdir" ]; then
      # Get directory name
      dir_name=$(basename "$subdir")

      # Skip special directories and dynamic routes
      if [[ "$dir_name" == "api" || "$dir_name" == _* || "$dir_name" == .* ||
            "$dir_name" == "components" || "$dir_name" == "lib" || "$dir_name" == "utils" ||
            "$dir_name" == \[*\] ]]; then
        continue
      fi

      # Build new route
      if [[ "$current_route" == "/" ]]; then
        new_route="/$dir_name"
      else
        new_route="$current_route/$dir_name"
      fi

      # Recurse into subdirectory
      discover_app_routes "$subdir" "$new_route"
    fi
  done
}

# Function to discover routes from pages directory (Next.js 12 and older)
discover_pages_routes() {
  local dir=$1
  local current_route=$2

  # Check for index files
  if ls "$dir"/index.{js,jsx,ts,tsx} 2>/dev/null | grep -q .; then
    echo "$current_route"
  fi

  # Check for page files and subdirectories
  for item in "$dir"/*; do
    if [ -d "$item" ]; then
      # Get directory name
      dir_name=$(basename "$item")

      # Skip special directories
      if [[ "$dir_name" == "api" || "$dir_name" == _* || "$dir_name" == .* ||
            "$dir_name" == "components" || "$dir_name" == "lib" || "$dir_name" == "utils" ]]; then
        continue
      fi

      # Build new route
      if [[ "$current_route" == "/" ]]; then
        new_route="/$dir_name"
      else
        new_route="$current_route/$dir_name"
      fi

      # Recurse into subdirectory
      discover_pages_routes "$item" "$new_route"
    elif [ -f "$item" ]; then
      # Process files
      filename=$(basename "$item")

      # Skip special files and index files (already handled)
      if [[ "$filename" == _* || "$filename" == index.* ]]; then
        continue
      fi

      # Check if it's a valid page file
      if [[ "$filename" =~ \.(js|jsx|ts|tsx)$ ]]; then
        # Skip dynamic pages
        if [[ "$filename" == *"["*"]"* ]]; then
          continue
        fi

        # Extract route name without extension
        route_name=$(echo "$filename" | sed -E 's/\.(js|jsx|ts|tsx)$//')

        # Build full route
        if [[ "$current_route" == "/" ]]; then
          echo "/$route_name"
        else
          echo "$current_route/$route_name"
        fi
      fi
    fi
  done
}

# Main function to discover all routes
discover_all_routes() {
  local discovered_routes=()

  # Check each directory for routes
  for dir in "${DIRECTORIES[@]}"; do
    if [ -d "$dir" ]; then
      echo "Scanning directory: $dir" >&2

      if [[ "$dir" == *"app"* ]]; then
        # App router discovery
        discover_app_routes "$dir" "/" > /tmp/app_routes_$.txt
        while read -r route; do
          if [ -n "$route" ]; then
            discovered_routes+=("$route")
          fi
        done < /tmp/app_routes_$.txt
        rm /tmp/app_routes_$.txt
      else
        # Pages router discovery
        discover_pages_routes "$dir" "/" > /tmp/pages_routes_$.txt
        while read -r route; do
          if [ -n "$route" ]; then
            discovered_routes+=("$route")
          fi
        done < /tmp/pages_routes_$.txt
        rm /tmp/pages_routes_$.txt
      fi
    fi
  done

  # Return discovered routes or default routes
  if [ ${#discovered_routes[@]} -eq 0 ]; then
    echo "No routes found, using defaults" >&2
    for route in "${DEFAULT_ROUTES[@]}"; do
      echo "$route"
    done
  else
    # Return unique routes
    printf '%s\n' "${discovered_routes[@]}" | sort -u
  fi
}

# Generate sitemap XML
generate_sitemap() {
  # Start XML file
  cat > "$OUTPUT_FILE" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF

  # Add each route
  while read -r route; do
    # Format URL (handle root path special case)
    if [[ "$route" == "/" ]]; then
      url="$DOMAIN"
      priority="1.0"
    else
      url="$DOMAIN$route"
      priority="0.8"
    fi

    # Add URL entry
    cat >> "$OUTPUT_FILE" << EOF
  <url>
    <loc>$url</loc>
    <lastmod>$TODAY</lastmod>
    <changefreq>daily</changefreq>
    <priority>$priority</priority>
  </url>
EOF
  done < /tmp/all_routes_$.txt
  rm /tmp/all_routes_$.txt

  # Close XML file
  cat >> "$OUTPUT_FILE" << EOF
</urlset>
EOF

  echo "Sitemap generated at $OUTPUT_FILE"
}

# Create public directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Discover all routes and save to a temporary file
discover_all_routes > /tmp/all_routes_$.txt

# Generate the sitemap
generate_sitemap