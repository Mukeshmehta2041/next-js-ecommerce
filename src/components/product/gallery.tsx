'use client'

import React from 'react'
import { useProduct, useUpdateURL } from './product-context'
import Image from 'next/image'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { GridTileImage } from '../grid/tile'
import { motion } from 'framer-motion'

type Props = {
    images: { src: string; altText: string }[]
}

export const Gallery = ({ images }: Props) => {
    const { state, updateImage } = useProduct()
    const updateURL = useUpdateURL()

    const imageIndex = state.image ? parseInt(state.image) : 0
    const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0
    const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1

    const buttonClassName =
        "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-[#8b7b6b] flex items-center justify-center"

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden rounded-lg">
                {images[imageIndex] && (
                    <Image
                        className="h-full w-full object-contain"
                        fill
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        src={images[imageIndex]?.src as string}
                        alt={images[imageIndex]?.altText as string}
                        priority={true}
                    />
                )}
                {images.length > 1 ? (
                    <motion.div
                        className="absolute bottom-4 flex w-full justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="mx-auto flex h-11 items-center rounded-full border border-[#d4c3a3] bg-white/80 text-[#3d3d3d] backdrop-blur">
                            <button
                                formAction={() => {
                                    const newState = updateImage(previousImageIndex.toString())
                                }}
                                aria-label="Previous product image"
                                className={buttonClassName}
                            >
                                <ArrowLeftIcon className="h-5" />
                            </button>
                            <div className="mx-1 h-6 w-px bg-[#d4c3a3]"></div>
                            <button
                                formAction={() => {
                                    const newState = updateImage(nextImageIndex.toString())
                                }}
                                aria-label="Next product image"
                                className={buttonClassName}
                            >
                                <ArrowRightIcon className="h-5" />
                            </button>
                        </div>
                    </motion.div>
                ) : null}
            </div>

            {images.length > 1 ? (
                <motion.ul
                    className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    {images.map((image, index) => {
                        const isActive = index === imageIndex
                        return (
                            <motion.li
                                key={image.src}
                                className="h-20 w-20"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <button
                                    formAction={() => {
                                        const newState = updateImage(index.toString())
                                        updateURL(newState)
                                    }}
                                    aria-label="Select product image"
                                    className="h-full w-full"
                                >
                                    <GridTileImage
                                        alt={image.altText}
                                        src={image.src}
                                        active={isActive}
                                        width={80}
                                        height={80}
                                    />
                                </button>
                            </motion.li>
                        )
                    })}
                </motion.ul>
            ) : null}
        </motion.form>
    )
}