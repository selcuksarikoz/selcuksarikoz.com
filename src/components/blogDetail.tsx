import Link from "next/link";
import { Clock, User, Tag, Calendar } from "lucide-react";
import { formatDate } from "@/src/lib/helpers";
import Image from "next/image";

interface BlogDetailProps {
    post: BlogPost;
}

const BlogDetail: React.FC<BlogDetailProps> = ({post}) => {
    return (
        <article className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Header Section */}
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gradient text-gradient-primary">
                    {post.title}
                </h1>

                <div className="flex justify-center items-center space-x-4 text-gray-400 mb-6">
                    <div className="flex items-center space-x-2">
                        <User size={16}/>
                        <span>{post.author.name}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Calendar size={16}/>
                        <time dateTime={post.publishedAt}>
                            {formatDate(post.publishedAt)}
                        </time>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Clock size={16}/>
                        <span>{post.readTime} min read</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex justify-center flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                        <Link
                            href={`/blog/tag/${tag}`}
                            key={tag}
                            className="tag tag-primary"
                        >
                            <Tag size={12} className="mr-1"/>
                            {tag}
                        </Link>
                    ))}
                </div>

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={800}
                            height={800}
                            className="w-full h-[400px] object-cover"
                        />
                    </div>
                )}
            </header>

            {/* Blog Content */}
            <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 mb-8 italic">{post.description}</p>

                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{__html: post.content}}
                />
            </div>

            {/* Author Bio */}
            <section className="mt-12 pt-8 border-t border-dark-100">
                <div className="flex items-center space-x-4">
                    {post.author.avatar && (
                        <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                    )}

                    <div>
                        <h3 className="text-xl font-semibold">{post.author.name}</h3>
                        <p className="text-gray-400">{post.author.bio}</p>
                    </div>
                </div>
            </section>
        </article>
    );
};

export default BlogDetail;
