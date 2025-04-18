import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from 'replicate';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
})

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
        }

        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    prompt
                }
            }
        );

        if (!isPro) {
            await incrementApiLimit();
        }

        return NextResponse.json(response);
    } catch (error: any) {
        // Handle specific Replicate API errors
        if (error?.response?.status === 402) {
            return new NextResponse("Billing limit reached. Please check your API account.", { status: 402 });
        }
        else {
            console.log('[REPLICATE_ERROR]', error);
            return new NextResponse("Internal Error", { status: 500 });
        }
    }
};