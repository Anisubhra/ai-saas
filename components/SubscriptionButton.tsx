"use client";

import React, { useState } from 'react'
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Props {
    isPro: boolean
}

const SubscriptionButton = ({
    isPro = false
}: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/stripe');

            window.location.href = response.data.url;
        }
        catch (e) {
            toast.error("Something went wrong");
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Button disabled={isLoading} variant={isPro ? "default" : "premium"} onClick={onClick}>
            {isPro ? 'Manage Subscription' : 'Upgrade'}
            {!isPro && <Zap className='w-4 h-4 ml-2 fill-white' />}
        </Button>
    )
}

export default SubscriptionButton