import BlogList from "@/src/components/blogList";

export const metadata = {
    title: "Selcuk's Blog",
    description: "Explore our latest blog posts and insights",
};

export default async function BlogPage() {
    const posts = [] as BlogPost[];

    return <BlogList posts={posts}/>;
}
