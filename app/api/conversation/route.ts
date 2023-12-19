import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages,
        });


        if (!isPro) {
            await incrementApiLimit();
        }

        return NextResponse.json(response.choices[0].message);
    } catch (error: any) {
        // Handle specific OpenAI API errors
        if (error.status === 400 && error.message.includes("Billing hard limit")) {
            return new NextResponse("Billing limit reached. Please check your API account.", { status: 402 });
        }
        // Handle rate limits or other OpenAI-specific errors
        else if (error.status === 429) {
            return new NextResponse("Rate limit exceeded. Please try again later.", { status: 429 });
        }
        else {
            console.error("[OPENAI_ERROR]", error);
            return new NextResponse("Failed to generate response. Please try again.", { status: 500 });
        }
    }
};