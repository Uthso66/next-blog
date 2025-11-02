"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function CommentsPage() {
  const { slug } = useParams();
  const displaySlug = Array.isArray(slug) ? slug.join("/") : slug;

  const [comments, setComments] = useState<string[]>([]);
  const [input, setInput] = useState("");
/*
useEffect(() => {
    const saved = localStorage.getItem(`comments-${displaySlug}`);
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, [displaySlug]);

*/
    useEffect(() => {
  const loadComments = async () => {
    const res = await fetch(`/api/comments?slug=${displaySlug}`);
    const data = await res.json();
    setComments(data.comments);
  };
  loadComments();
}, [displaySlug]);

  
  useEffect(() => {
    localStorage.setItem(`comments-${displaySlug}`, JSON.stringify(comments));
  }, [comments, displaySlug]);
  /*
  const addComment = () => {
    if (!input.trim()) return;
    setComments([...comments, input.trim()]);
    setInput("");
  };
  */
  const addComment = async () => {
  if (!input.trim()) return;

  await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug: displaySlug, comment: input }),
  });

  setComments([...comments, input.trim()]);
  setInput("");
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
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Comment
        </button>

        <ul className="mt-4 space-y-2">
          {comments.map((c, i) => (
            <li key={i} className="bg-gray-800 p-2 rounded">{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
