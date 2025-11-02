import { NextResponse } from "next/server";

const commentsData: Record<string, string[]> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  return NextResponse.json({ comments: commentsData[slug || ""] || [] });
}

export async function POST(request: Request) {
  const { slug, comment } = await request.json();

  if (!slug || !comment) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  if (!commentsData[slug]) commentsData[slug] = [];
  commentsData[slug].push(comment);

  return NextResponse.json({ success: true, comments: commentsData[slug] });
}
