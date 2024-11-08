'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Product } from '@/lib/shopify/types'
import { Button } from '@/components/ui/button'
import { ShoppingCart, ChevronRight } from 'lucide-react'

type Props = {
    products: Product[]
}

export const FeaturedProductList = ({ products }: Props) => {
    const sortedProducts = products.slice(0, 4)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    }

    return (
        <section ref={ref} className="bg-[#f6f1eb] py-16">
            <div className="container mx-auto px-4">
                <motion.h1
                    className="text-4xl font-bold text-center mb-12 text-[#3d3d3d]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    Featured Jewelry
                </motion.h1>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {sortedProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="group"
                            variants={itemVariants}
                        >
                            <Link href={`/product/${product.handle}`} className="block">
                                <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-white shadow-md">
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#e6d9c7]/20 to-[#d4c3a3]/20 animate-shimmer" />
                                    <Image
                                        src={product.featuredImage?.url || "/placeholder.svg"}
                                        alt={product.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h2 className="text-lg font-semibold mb-1 group-hover:text-[#8b7b6b] transition-colors text-[#3d3d3d]">
                                    {product.title}
                                </h2>
                                <p className="text-sm text-[#6b5d4e] mb-2">
                                    ${product.priceRange.maxVariantPrice?.amount}
                                </p>
                                {product.description && (
                                    <p className="text-sm text-[#5c5145] line-clamp-2 mb-4">
                                        {product.description}
                                    </p>
                                )}
                            </Link>
                            <Button
                                variant="outline"
                                className="w-full bg-[#d4c3a3] text-[#3d3d3d] hover:bg-[#8b7b6b] hover:text-white transition-colors border-[#8b7b6b]"
                            >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                            </Button>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link href="/products">
                        <Button
                            variant="default"
                            size="lg"
                            className="font-semibold bg-[#8b7b6b] text-white hover:bg-[#6b5d4e] transition-colors"
                        >
                            View All
                            {/* <ChevronRight className="w-4 h-4 ml-2" /> */}
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}