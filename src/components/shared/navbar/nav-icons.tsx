import Image from 'next/image'
import React from 'react'

export const NavIcons = () => {
    const counter = 0;
    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            <Image
                src="/icons/profile.png"
                alt=""
                width={22}
                height={22}
                className="cursor-pointer"
            />
            <Image
                src="/icons/notification.png"
                alt=""
                width={22}
                height={22}
                className="cursor-pointer"
            />
            <div
                className="relative cursor-pointer"
            >
                <Image src="/icons/cart.png" alt="" width={22} height={22} />
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
                    {counter}
                </div>
            </div>
        </div>)
}
