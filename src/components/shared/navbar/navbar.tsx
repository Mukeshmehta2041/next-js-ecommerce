import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ChevronDown } from 'lucide-react'
import { SearchBar } from './searchbar'
import { NavIcons } from './nav-icons'
import { getNestedMenu } from '@/lib/shopify'
import { auth } from '@/auth'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type NestedMenu = {
    title: string;
    path: string;
    items?: NestedMenu[];
}

const MenuItem = ({ item }: { item: NestedMenu }) => {
    if (item.items && item.items.length > 0) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 hover:bg-accent rounded-md transition-colors">
                    {item.title}
                    <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {item.items.map((subItem) => (
                        <DropdownMenuItem key={subItem.path} asChild>
                            <Link href={subItem.path}>{subItem.title}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <Link href={item.path} className="px-4 py-2 hover:bg-accent rounded-md transition-colors">
            {item.title}
        </Link>
    )
}

export const Navbar = async () => {
    const menu = await getNestedMenu("main-nav-menu") as NestedMenu[];
    const session = await auth()

    return (
        <nav className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
            <div className="hidden md:flex items-center justify-between h-full">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-3">
                        <svg width="200" height="100" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="15" stroke="black" strokeWidth="1" fill="none" />
                            <circle cx="65" cy="50" r="15" stroke="black" strokeWidth="1" fill="none" />
                            <text x="85" y="60" fontFamily="Didot, serif" fontSize="32" fontWeight="normal" fill="black">Vershe</text>
                        </svg>
                    </Link>
                    <div className="hidden xl:flex items-center gap-2">
                        {menu.length > 0 && menu.map((item) => (
                            <MenuItem key={item.path} item={item} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-end gap-8 flex-1">
                    <SearchBar />
                    <NavIcons session={session} />
                </div>
            </div>
        </nav>
    )
}