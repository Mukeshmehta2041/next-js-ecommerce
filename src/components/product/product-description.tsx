'use client'

import { Product } from '@/lib/shopify/types'
import React from 'react'
import Price from '../shared/price'
import { VariantSelector } from './variant-selector'
import Prose from '../shared/prose'
import { AddToCart } from '../cart/add-cart'
import { motion } from 'framer-motion'

export const ProductDescription = ({ product }: { product: Product }) => {
    return (
        <motion.div
            className="flex flex-col space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col border-b border-[#d4c3a3] pb-6">
                <motion.h1
                    className="mb-2 text-4xl font-semibold text-[#3d3d3d]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {product?.title}
                </motion.h1>
                <motion.div
                    className="mr-auto w-auto rounded-full bg-[#8b7b6b] p-2 text-sm text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Price
                        amount={product.priceRange.maxVariantPrice.amount}
                        currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                    />
                </motion.div>
            </div>
            <VariantSelector options={product.options} variants={product.variants} />
            {product.descriptionHtml ? (
                <Prose
                    className="mb-6 text-sm leading-relaxed text-[#5c5145]"
                    html={product.descriptionHtml}
                />
            ) : null}
            <AddToCart product={product} />
        </motion.div>
    )
}