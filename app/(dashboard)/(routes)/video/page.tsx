"use client";

import * as z from "zod";
import Heading from '@/components/Heading'
import { MessageSquare, Music, VideoIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import { useProModel } from "@/app/hooks/use-pro-model";
import toast from "react-hot-toast";

const VideoGeneration = () => {
    const router = useRouter();
    const [video, setVideo] = useState<string>();
    const proModal = useProModel();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo('');

            const response = await axios.post("/api/video", values);

            setVideo(response.data[0]);

            form.reset();
        }
        catch (e: any) {
            if (e?.response?.status === 403) {
                proModal.onOpen();
            }
            else {
                toast.error(e?.response?.data || "Something went wrong");
            }
        }
        finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Video Generation"
                description="Turn your prompt into video."
                icon={VideoIcon}
                iconColor='text-orange-700'
                bgColor='bg-orange-700/10'
            />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Ask Gene..."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">Generate</Button>
                        </form>
                    </Form>
                </div>

                <div className="space-y-4 mt-4">
                    {
                        isLoading && (
                            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                                <Loader />
                            </div>
                        )
                    }
                    {
                        !video && !isLoading && (
                            <Empty label="No video generated." />
                        )
                    }

                    {
                        video && (
                            <video controls className="w-full mt-8 aspect-video rounded-lg border bg-black">
                                <source src={video} />
                            </video>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default VideoGeneration