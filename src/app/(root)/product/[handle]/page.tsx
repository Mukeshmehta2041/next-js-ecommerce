import { Gallery } from '@/components/product/gallery'
import { ProductProvider } from '@/components/product/product-context'
import { ProductDescription } from '@/components/product/product-description'
import { getProduct } from '@/lib/shopify'
import { Image } from '@/lib/shopify/types'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

type Props = {
    params: {
        handle: string
    }
}

const ProductPage = async ({ params: { handle } }: Props) => {
    const product = await getProduct(handle)

    if (!product) return notFound()

    return (
        <ProductProvider>
            <div className="mx-auto max-w-screen-2xl px-4 py-12 bg-[#f6f1eb]">
                <div
                    // className="flex flex-col rounded-lg border border-[#d4c3a3] bg-white p-8 md:p-12 lg:flex-row lg:gap-8 shadow-md"
                    className="flex flex-col rounded-lg  p-8 md:p-12 lg:flex-row lg:gap-8"
                >
                    <div className="h-full w-full basis-full lg:basis-3/5">
                        <Suspense
                            fallback={
                                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden bg-[#e6d9c7] animate-pulse" />
                            }
                        >
                            <Gallery
                                images={product.images.slice(0, 5).map((image: Image) => ({
                                    src: image.url,
                                    altText: image.altText,
                                }))}
                            />
                        </Suspense>
                    </div>
                    <div className="basis-full lg:basis-2/5">
                        <Suspense fallback={<div className="h-full w-full bg-[#e6d9c7] animate-pulse" />}>
                            <ProductDescription product={product} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </ProductProvider>
    )
}

export default ProductPage