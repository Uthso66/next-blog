import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ comments: [] });

  // Find the Post first
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { comments: { orderBy: { createdAt: "desc" } } },
  });

  if (!post) return NextResponse.json({ comments: [] });

  return NextResponse.json({ comments: post.comments });
}

export async function POST(request: Request) {
  const { slug, comment } = await request.json();
  if (!slug || !comment)
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  // Find the Post first
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });

  await prisma.comment.create({
    data: { content: comment, postId: post.id },
  });

  const updatedPost = await prisma.post.findUnique({
    where: { slug },
    include: { comments: { orderBy: { createdAt: "desc" } } },
  });

  return NextResponse.json({ success: true, comments: updatedPost?.comments ?? [] });
}
