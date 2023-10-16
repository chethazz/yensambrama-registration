import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(request: NextApiRequest) {
    return NextResponse.json({ message: 'Hello from the API' })
}