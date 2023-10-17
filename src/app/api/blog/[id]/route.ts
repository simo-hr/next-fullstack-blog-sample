import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { main } from '../route'

const prisma = new PrismaClient()

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split('/blog/')[1])
    await main()
    const post = await prisma.post.findFirst({ where: { id } })
    return NextResponse.json({ message: 'success', post }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split('/blog/')[1])
    const { title, description } = await req.json()
    await main()
    const post = await prisma.post.update({
      data: { title, description },
      where: { id },
    })
    return NextResponse.json({ message: 'success', post }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split('/blog/')[1])
    await main()
    const post = await prisma.post.delete({
      where: { id },
    })
    return NextResponse.json({ message: 'success', post }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'error', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
