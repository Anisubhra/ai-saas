"use client";

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Sidebar from './Sidebar';

interface Props {
    apiLimitCount: number,
    isPro: boolean
}

const MobileSidebar = ({
    apiLimitCount,
    isPro = false
}: Props) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient)
        return null;

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className='md:hidden'>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className='p-0'>
                <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar