import Link from 'next/link';
import React from 'react';

export default function NewArrivals() {
    // Collection data to simplify repeated elements
    const collections = [
        {
            href: '/search/womens-collection',
            src: '/womens-collection.png',
            alt: "Women's Collection",
            title: "Women’s Collection",
        },
        {
            href: '/search/mens-collection',
            src: '/mens-collection.png',
            alt: "Men's Collection",
            title: "Men’s Collection",
        },
        {
            href: '/search/kids',
            src: '/kids-collection.png',
            alt: "Kids' Collection",
            title: "Kids’ Collection",
        },
        {
            href: '/search/sales',
            src: '/sales-collection.png',
            alt: "Sale's Collection",
            title: "Sale’s Collection",
        },
    ];

    return (
        <section className="w-full grid place-content-center">
            <div className="container space-y-12 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg px-3 py-1 text-sm">
                            New Arrivals
                        </div>
                        <h2 className="text-4xl font-bold text-center mb-8">
                            Trending Now
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed">
                            Check out our latest collection of stylish and comfortable
                            clothing.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid items-start justify-center gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
                    {collections.map(({ href, src, alt, title }) => (
                        <div key={href} className="grid gap-1">
                            <Link href={href} className="group" prefetch={false}>
                                <img
                                    src={src}
                                    width="400"
                                    height="500"
                                    alt={alt}
                                    className="aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform"
                                />
                                <h3 className="mt-4 text-lg font-bold group-hover:underline">
                                    {title}
                                </h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
