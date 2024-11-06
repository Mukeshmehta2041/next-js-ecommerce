"use client"

import { auth } from '@/auth';
import { Session } from 'next-auth';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'


type Props = {
    session: Session | null
}

export const NavIcons = ({ session }: Props) => {

    const router = useRouter()

    const handleClick = () => {
        if (session) {
            return router.push("/account")
        } else {
            router.push("/sign-in")
        }
    }

    const counter = 0;
    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            <Image
                src="/icons/profile.png"
                alt=""
                width={22}
                height={22}
                className="cursor-pointer"
                onClick={handleClick}
            />
            <div
                className="relative cursor-pointer"
            >
                <Image src="/icons/cart.png" alt="" width={22} height={22} />
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-store rounded-full text-white text-sm flex items-center justify-center">
                    {counter}
                </div>
            </div>
        </div>)
}
