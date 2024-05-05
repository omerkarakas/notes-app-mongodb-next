import connectMongoDB from "@/lib/mongodb";
import Note from "@/models/note";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, description } = await request.json();

  await connectMongoDB();
  await Note.create({ title, description });

  return NextResponse.json({ message: "Note Added" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const notes = await Note.find({});
  return NextResponse.json(notes);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Note.findByIdAndDelete(id);
  return NextResponse.json({ message: "Note Deleted" }, { status: 200 });
}
