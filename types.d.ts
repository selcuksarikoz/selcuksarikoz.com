export declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer: any;
    }

    export interface Author {
        id: string;
        name: string;
        avatar?: string;
        bio?: string;
    }

    export interface BlogPost {
        id: string;
        title: string;
        slug: string;
        description: string;
        content: string;
        author: Author;
        publishedAt: string;
        updatedAt?: string;
        tags: string[];
        readTime: number;
        coverImage?: string;
    }

    // Optional: Metadata for SEO and sharing
    export interface BlogPostMetadata {
        title: string;
        description: string;
        keywords: string[];
        ogImage?: string;
    }
}
