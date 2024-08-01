import prisma from "../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "../../postSchema";





export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = postSchema.safeParse(body);
    console.log('Abhi', validation);
    if (!validation.success)
        return NextResponse.json(validation.error, { status: 400 });
    const issue = await prisma.issue.create({
        data: body
    }); 
    return NextResponse.json(issue);
}