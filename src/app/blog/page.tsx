import Link from "next/link";
import { posts } from "@/data/posts";

export default function BlogListPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-purple-600">Blog</h1>
            <ul className="mt-4 space-y-2">
                {posts.map(( {slug, title })=> (
                    <li key={slug}>
                        <Link href={`/blog/${slug}`} className="text-blue-500 underline">
                        {title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}