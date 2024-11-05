import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export const CategoryList = () => {

    const cats = {
        items: [
            {
                _id: "201",
                slug: "rings",
                name: "Rings",
                media: {
                    mainMedia: { image: { url: "/images/categories/rings.jpg" } }
                }
            },
            {
                _id: "202",
                slug: "necklaces",
                name: "Necklaces",
                media: {
                    mainMedia: { image: { url: "/images/categories/necklaces.jpg" } }
                }
            },
            {
                _id: "203",
                slug: "bracelets",
                name: "Bracelets",
                media: {
                    mainMedia: { image: { url: "/images/categories/bracelets.jpg" } }
                }
            },
            {
                _id: "204",
                slug: "earrings",
                name: "Earrings",
                media: {
                    mainMedia: { image: { url: "/images/categories/earrings.jpg" } }
                }
            },
            {
                _id: "205",
                slug: "watches",
                name: "Watches",
                media: {
                    mainMedia: { image: { url: "/images/categories/watches.jpg" } }
                }
            },
            {
                _id: "206",
                slug: "pendants",
                name: "Pendants",
                media: {
                    mainMedia: { image: { url: "/images/categories/pendants.jpg" } }
                }
            }
        ]
    };

    return (
        <div className="px-4 overflow-x-scroll scrollbar-hide">
            <div className="flex gap-4 md:gap-8">
                {cats.items.map((item) => (
                    <Link
                        href={`/list?cat=${item.slug}`}
                        className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
                        key={item._id}
                    >
                        <div className="relative bg-slate-100 w-full h-96">
                            <Image
                                src={item.media?.mainMedia?.image?.url || "cat.png"}
                                alt=""
                                fill
                                sizes="20vw"
                                className="object-cover"
                            />
                        </div>
                        <h1 className="mt-8 font-light text-xl tracking-wide">
                            {item.name}
                        </h1>
                    </Link>
                ))}
            </div>
        </div>
    )
}
