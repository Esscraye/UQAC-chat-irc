import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: "asc",
      },
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { content, author } = await request.json()

    if (!content || !author) {
      return NextResponse.json({ error: "Content and author are required" }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        content,
        author,
      },
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error("Error creating message:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 })
  }
}

