import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()
export async function main() {
  try {
    await prisma.$connect()
  } catch (error) {
    return Error("Can't connect to database")
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main()
    const posts = await prisma.post.findMany()
    return NextResponse.json({ message: 'success', posts }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json()
    await main()
    const post = await prisma.post.create({ data: { title, description } })
    return NextResponse.json({ message: 'success', post }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
