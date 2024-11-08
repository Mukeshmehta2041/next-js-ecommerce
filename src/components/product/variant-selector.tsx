'use client'

import { ProductOption, ProductVariant } from '@/lib/shopify/types'
import React from 'react'
import { useProduct, useUpdateURL } from './product-context'
import clsx from 'clsx'
import { motion } from 'framer-motion'

type Combination = {
    id: string
    availableForSale: boolean
    [key: string]: string | boolean
}

export const VariantSelector = ({
    options,
    variants,
}: {
    options: ProductOption[]
    variants: ProductVariant[]
}) => {
    const { state, updateOption } = useProduct()
    const updateURL = useUpdateURL()

    const hasNoOptionsOrJustOneOption =
        !options.length || (options.length === 1 && options[0]?.values.length === 1)

    if (hasNoOptionsOrJustOneOption) {
        return null
    }

    const combinations: Combination[] = variants.map((variant) => ({
        id: variant.id,
        availableForSale: variant.availableForSale,
        ...variant.selectedOptions.reduce(
            (accumulator, option) => ({
                ...accumulator,
                [option.name.toLowerCase()]: option.value,
            }),
            {}
        ),
    }))

    return options.map((option) => (
        <motion.form
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <dl className="mb-8">
                <dt className="mb-4 text-sm uppercase tracking-wide text-[#3d3d3d]">{option.name}</dt>
                <dd className="flex flex-wrap gap-3">
                    {option.values.map((value) => {
                        const optionNameLowerCase = option.name.toLowerCase()
                        const optionParams = { ...state, [optionNameLowerCase]: value }
                        const filtered = Object.entries(optionParams).filter(
                            ([key, value]) =>
                                options.find(
                                    (option) => option.name.toLowerCase() === key && option.values.includes(value)
                                )
                        )
                        const isAvailableForSale = combinations.find((combination) =>
                            filtered.every(
                                ([key, value]) => combination[key] === value && combination.availableForSale
                            )
                        )
                        const isActive = state[optionNameLowerCase] === value

                        return (
                            <motion.button
                                formAction={() => {
                                    const newState = updateOption(optionNameLowerCase, value)
                                    updateURL(newState)
                                }}
                                key={value}
                                aria-disabled={!isAvailableForSale}
                                disabled={!isAvailableForSale}
                                title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                                className={clsx(
                                    'flex min-w-[48px] items-center justify-center rounded-full border px-2 py-1 text-sm',
                                    {
                                        'cursor-default ring-2 ring-[#8b7b6b] bg-[#8b7b6b] text-white': isActive,
                                        'ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-[#8b7b6b] bg-[#f6f1eb] text-[#3d3d3d]':
                                            !isActive && isAvailableForSale,
                                        'relative z-10 cursor-not-allowed overflow-hidden bg-[#e6d9c7] text-[#8b7b6b] ring-1 ring-[#d4c3a3] before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-[#d4c3a3] before:transition-transform':
                                            !isAvailableForSale,
                                    }
                                )}
                                whileHover={{ scale: isAvailableForSale ? 1.05 : 1 }}
                                whileTap={{ scale: isAvailableForSale ? 0.95 : 1 }}
                            >
                                {value}
                            </motion.button>
                        )
                    })}
                </dd>
            </dl>
        </motion.form>
    ))
}