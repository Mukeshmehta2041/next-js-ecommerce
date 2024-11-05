import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SearchBar } from './searchbar'
import { NavIcons } from './nav-icons'
import { getMenu } from '@/lib/shopify'

export const Navbar = async () => {
    const menu = await getMenu("frontend-nav-menu");

    console.log("menu", menu);


    return (
        <nav className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">

            {/* Bigger Screen  */}
            <div className="hidden gap-8 md:flex items-center justify-between  h-full">
                <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/logo.png" alt="" width={24} height={24} />
                        <div className="text-2xl tracking-wide">STORE</div>
                    </Link>
                    <div className="hidden xl:flex gap-4">
                        <Link href="/">Homepage</Link>
                        <Link href="/">Shop</Link>
                        <Link href="/">Deals</Link>
                        <Link href="/">About</Link>
                        <Link href="/">Contact</Link>
                    </div>

                </div>
                <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
                    <SearchBar />
                    <NavIcons />
                </div>
            </div>
        </nav>
    )
}
