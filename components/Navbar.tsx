import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount() || 0;
    const isPro = await checkSubscription();

    return (
        <div className='flex item-center p-4'>
            <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            <div className='flex items-center w-full justify-end'>
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    )
}

export default Navbar