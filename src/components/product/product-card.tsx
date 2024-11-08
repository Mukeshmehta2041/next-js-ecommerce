'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/shopify/types';

type ProductCardProps = {
    product: Product;
    itemVariants: any;
};

export const ProductCard = ({ product, itemVariants }: ProductCardProps) => {
    return (
        <motion.div key={product.id} className="group" variants={itemVariants}>
            <Link href={`/product/${product.handle}`} className="block">
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-white shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#e6d9c7]/20 to-[#d4c3a3]/20 animate-shimmer" />
                    <Image
                        src={product.featuredImage?.url || '/placeholder.svg'}
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
    );
};
