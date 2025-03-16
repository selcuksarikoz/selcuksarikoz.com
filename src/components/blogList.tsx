import Link from "next/link";
import { Clock, User, Tag } from "lucide-react";
import Image from "next/image";

interface BlogListProps {
    posts: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({posts}) => {
    return (
        <div className="container flex flex-col mx-auto pt-30">
            <h1 className="text-4xl font-bold mb-8 text-gradient text-gradient-primary">
                Latest Blog Posts
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link
                        href={`/blog/${post.slug}`}
                        key={post.id}
                        className="card card-hover"
                    >
                        {post.coverImage && (
                            <div className="h-48 overflow-hidden">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    width={400}
                                    height={192}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2 text-white">
                                {post.title}
                            </h2>

                            <p className="text-gray-400 mb-4 line-clamp-2">
                                {post.description}
                            </p>

                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <User size={16}/>
                                    <span>{post.author.name}</span>
                                </div>

                                <div className="flex items-center space-x-1">
                                    <Clock size={16}/>
                                    <span>{post.readTime} min read</span>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="tag tag-primary">
                    <Tag size={12} className="mr-1"/>
                                        {tag}
                  </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
