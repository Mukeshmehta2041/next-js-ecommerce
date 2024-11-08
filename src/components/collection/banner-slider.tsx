'use client'

import { getMenu } from '@/lib/shopify'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

export const menu = {
    items: [
        {
            title: "Explore New Arrivals",
            image: {
                src: "https://www.giva.co/cdn/shop/files/Hero_Web-min-1.jpg?v=1728381861&width=2000",
            },
            url: "/collections/new-arrivals",
        },
        {
            title: "Exclusive Offers",
            image: {
                src: "https://www.giva.co/cdn/shop/files/40-_Magic_of_Tradition_hero_banner_-web-min.jpg?v=1727700210&width=2000",
            },
            url: "/collections/offers",
        },
        {
            title: "Best Sellers",
            image: {
                src: "https://www.giva.co/cdn/shop/files/Hero_Web-min_b6e4367e-6ca5-42a4-961a-c379cc4d3a5f.jpg?v=1728381861&width=2000",
            },
            url: "/collections/best-sellers",
        },
        {
            title: "Summer Collection",
            image: {
                src: "https://www.giva.co/cdn/shop/files/Personalised_-_Hero_Banner_Web_1_-min.jpg?v=1728957537&width=2000",
            },
            url: "/collections/summer",
        },
    ],
};

export const BannerSlider = () => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    if (!menu || !menu.items || menu.items.length === 0) {
        return null
    }

    return (
        <div className="w-full">
            <Carousel
                setApi={setApi}
                className="w-full"
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
            >
                <CarouselContent>
                    {menu.items.map((item, index) => (
                        <CarouselItem key={index}>
                            <Card className="border-none">
                                <CardContent className="p-0 relative" style={{ paddingTop: `${(310 / 929) * 100}%` }}>
                                    <Image
                                        src={item.image?.src || '/placeholder.svg'}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white p-6">
                                        <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
                                        {item.url && (
                                            <Link href={item.url} passHref>
                                                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black transition-colors">
                                                    Learn More
                                                </Button>
                                            </Link>
                                        )}
                                    </div> */}
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    {Array.from({ length: count }).map((_, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            className={`w-2 h-2 p-0 hover:bg-slate-400 rounded-full ${index === current - 1 ? 'bg-slate-600' : 'bg-slate-300'
                                }`}
                            onClick={() => api?.scrollTo(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

