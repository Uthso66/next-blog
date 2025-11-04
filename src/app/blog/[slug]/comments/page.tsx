"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

type Comment = {
  id: number;
  slug: string;
  content: string;
  createdAt: string;
};

export default function CommentsPage() {
  const { slug } = useParams();
  const displaySlug = Array.isArray(slug) ? slug.join("/") : slug;

  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load comments from API
  useEffect(() => {
    const loadComments = async () => {
      const res = await fetch(`/api/comments?slug=${displaySlug}`);
      const data = await res.json();
      setComments(data.comments || []);
    };
    loadComments();
  }, [displaySlug]);

  // 🔹 Add a new comment
  const addComment = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: displaySlug, comment: input }),
    });

    const data = await res.json();
    setComments(data.comments || []);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-400">
        Comments for {displaySlug}
      </h1>

      <div className="mt-4 space-y-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a comment..."
          className="border border-gray-700 bg-gray-900 p-2 rounded text-white w-full"
        />
        <button
          onClick={addComment}
          disabled={loading}
          className={`bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "Add Comment"}
        </button>

        <ul className="mt-4 space-y-2">
          {comments.length === 0 ? (
            <li className="text-gray-400 italic">No comments yet</li>
          ) : (
            comments.map((c) => (
              <li key={c.id} className="bg-gray-800 p-2 rounded">
                <p className="text-white">{c.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
