import { getCollections } from '@/lib/shopify'
import Image from 'next/image'
import Link from 'next/link'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card'

export const CollectionCarousel = async () => {
    const collections = await getCollections()
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Collections</h2>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {collections?.map((collection) => (
                        <CarouselItem key={collection.handle} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/6">
                            <Link href={`/collections/${collection.handle}`}>
                                <Card className="overflow-hidden bg-transparent border-none shadow-none">
                                    <CardContent className="p-4 flex flex-col items-center">
                                        <div className="relative size-32 mb-4">
                                            <Image
                                                src={collection.image?.src}
                                                alt={collection.title}
                                                fill
                                                className="rounded-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="font-semibold text-lg text-center">{collection.title}</h3>
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-center mt-6 gap-2">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </div>
    )
}