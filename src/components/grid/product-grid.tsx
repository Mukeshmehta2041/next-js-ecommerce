'use client'

import { motion } from 'framer-motion'
import { Product } from '@/lib/shopify/types'
import { ProductCard } from '../product/product-card'

export const ProductGrid = ({ products }: { products: Product[] }) => {
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

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-4">No products found</h2>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        )
    }

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product}
                    itemVariants={itemVariants}
                />
            ))}
        </motion.div>
    )
}
