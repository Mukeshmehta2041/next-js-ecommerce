"use client"

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import DOMPurify from 'dompurify';

const res = {
    items: [
        {
            _id: "201",
            slug: "sapphire-engagement-ring",
            name: "Sapphire Engagement Ring",
            price: { price: 649.99 },
            media: {
                mainMedia: { image: { url: "/images/jewelry/sapphire_engagement_ring.jpg" } },
                items: [
                    { image: { url: "/images/jewelry/sapphire_engagement_ring.jpg" } },
                    { image: { url: "/images/jewelry/sapphire_engagement_ring_alt1.jpg" } },
                    { image: { url: "/images/jewelry/sapphire_engagement_ring_alt2.jpg" } }
                ]
            },
            additionalInfoSections: [
                { title: "shortDesc", description: "A stunning sapphire engagement ring that shines with elegance and charm." }
            ]
        },
        {
            _id: "202",
            slug: "rose-gold-choker",
            name: "Rose Gold Choker",
            price: { price: 149.99 },
            media: {
                mainMedia: { image: { url: "/images/jewelry/rose_gold_choker.jpg" } },
                items: [
                    { image: { url: "/images/jewelry/rose_gold_choker.jpg" } },
                    { image: { url: "/images/jewelry/rose_gold_choker_alt1.jpg" } }
                ]
            },
            additionalInfoSections: [
                { title: "shortDesc", description: "A trendy rose gold choker that complements any outfit with its modern design." }
            ]
        },
        {
            _id: "203",
            slug: "amethyst-stud-earrings",
            name: "Amethyst Stud Earrings",
            price: { price: 89.99 },
            media: {
                mainMedia: { image: { url: "/images/jewelry/amethyst_stud_earrings.jpg" } },
                items: [
                    { image: { url: "/images/jewelry/amethyst_stud_earrings.jpg" } },
                    { image: { url: "/images/jewelry/amethyst_stud_earrings_alt1.jpg" } }
                ]
            },
            additionalInfoSections: [
                { title: "shortDesc", description: "Beautiful amethyst stud earrings that add a pop of color to your ensemble." }
            ]
        },
        {
            _id: "204",
            slug: "gold-link-bracelet",
            name: "Gold Link Bracelet",
            price: { price: 199.99 },
            media: {
                mainMedia: { image: { url: "/images/jewelry/gold_link_bracelet.jpg" } },
                items: [
                    { image: { url: "/images/jewelry/gold_link_bracelet.jpg" } },
                    { image: { url: "/images/jewelry/gold_link_bracelet_alt1.jpg" } }
                ]
            },
            additionalInfoSections: [
                { title: "shortDesc", description: "An elegant gold link bracelet that exudes luxury and style." }
            ]
        },
    ],
    currentPage: 1,
    hasPrev: () => false,
    hasNext: () => true
};

export const ProductList = () => {
    return (
        <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
            {res?.items?.map((product) => (
                <Link
                    href={"/" + product?.slug}
                    className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
                    key={product?._id}
                >
                    <div className="relative w-full h-80">
                        <Image
                            src={product.media?.mainMedia?.image?.url || "/product.png"}
                            alt=""
                            fill
                            sizes="25vw"
                            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
                        />
                        {product?.media?.items && (
                            <Image
                                src={product.media?.items[1]?.image?.url || "/product.png"}
                                alt=""
                                fill
                                sizes="25vw"
                                className="absolute object-cover rounded-md"
                            />
                        )}
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">{product?.name}</span>
                        <span className="font-semibold">${product?.price?.price}</span>
                    </div>
                    {product?.additionalInfoSections && (
                        <div
                            className="text-sm text-gray-500"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    product.additionalInfoSections.find(
                                        (section: any) => section?.title === "shortDesc"
                                    )?.description || ""
                                ),
                            }}
                        ></div>
                    )}
                    <button className="rounded-2xl ring-1 ring-store text-store w-max py-2 px-4 text-xs hover:bg-store hover:text-white">
                        Add to Cart
                    </button>
                </Link>
            ))}
            {/* {searchParams?.cat || searchParams?.name ? (
                <Pagination
                    currentPage={items.currentPage || 0}
                    hasPrev={items.hasPrev()}
                    hasNext={items.hasNext()}
                />
            ) : null} */}
        </div>


    )
}
