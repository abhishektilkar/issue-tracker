import { prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const postSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
});


export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = postSchema.safeParse(body);
    if (!validation) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const issue = await prisma.issue.create({
        data: body
    });
    return NextResponse.json(issue);
}