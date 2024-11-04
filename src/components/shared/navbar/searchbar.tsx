"use client"

import Image from 'next/image'
import React from 'react'

export const SearchBar = () => {
    const handleSearch = () => {

    }
    return (
        <form
            className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
            onSubmit={handleSearch}
        >
            <input
                type="text"
                name="name"
                placeholder="Search"
                className="flex-1 bg-transparent outline-none"
            />
            <button className="cursor-pointer">
                <Image src="/icons/search.png" alt="" width={16} height={16} />
            </button>
        </form>
    )
}
