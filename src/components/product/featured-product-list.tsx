'use client'

import { Button } from '@/components/ui/button'
import { Product } from '@/lib/shopify/types'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { ProductCard } from './product-card'

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
                        <ProductCard
                            key={product.id}
                            product={product}
                            itemVariants={itemVariants}
                        />
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
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}