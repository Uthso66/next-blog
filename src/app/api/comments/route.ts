import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ comments:[]});

  const comments = await prisma.comment.findMany({
    where: {slug},
    orderBy: {createdAt: "desc"},
  });
  return NextResponse.json({ comments });
}

export async function POST(request: Request) {
  const { slug, comment } = await request.json();

  if (!slug || !comment) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  await prisma.comment.create({data: {slug, content: comment}});

  const comments = await prisma.comment.findMany({
    where: { slug },
    orderBy: { createdAt: "desc"},
  });

  return NextResponse.json({ success: true, comments });
}
