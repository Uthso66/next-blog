"use client";

import { useParams } from "next/navigation";
import { posts } from "@/data/posts";

export default function BlogPostPage() {
  const { slug } = useParams();
  
  const displaySlug = Array.isArray(slug) ? slug.join('/') : slug;
  const post = posts.find((p) => p.slug === displaySlug);
  if (!post) {
    return <div className="p-8 text-red-500">Post not found!</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-red-600">{post.title}</h1>
      <p className="mt-4 text-gray-700">
        {post.content}
      </p>
      <a href={`/blog/${displaySlug}/comments`} className="text-blue-400 underline block mt-8">
      View Comments</a>
    </div>
  );
}