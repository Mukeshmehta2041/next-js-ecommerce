'use client'

import { Product, ProductVariant } from "@/lib/shopify/types"
import { useProduct } from "../product/product-context"
import { useCart } from "./cart-context"
import { useFormState } from "react-dom"
import clsx from "clsx"
import { PlusIcon } from "lucide-react"
import { addItem } from "@/lib/actions/cart.action"
import { motion } from 'framer-motion'

function SubmitButton({
    availableForSale,
    selectedVariantId,
}: {
    availableForSale: boolean
    selectedVariantId: string | undefined
}) {
    const buttonClasses =
        "relative flex w-full items-center justify-center rounded-full p-4 tracking-wide text-white"
    const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60"

    if (!availableForSale) {
        return (
            <motion.button
                disabled
                className={clsx(buttonClasses, disabledClasses, "bg-[#d4c3a3]")}
                whileHover={{ scale: 1 }}
            >
                Out of Stock
            </motion.button>
        )
    }

    if (!selectedVariantId) {
        return (
            <motion.button
                aria-label="Please select an option"
                disabled
                className={clsx(buttonClasses, disabledClasses, "bg-[#d4c3a3]")}
                whileHover={{ scale: 1 }}
            >
                <div className="absolute left-0 ml-4">
                    <PlusIcon className="h-5" />
                </div>
                Add to Cart
            </motion.button>
        )
    }

    return (
        <motion.button
            aria-label="Add to cart"
            className={clsx(buttonClasses, "bg-[#8b7b6b] hover:bg-[#6b5d4e]")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="absolute left-0 ml-4">
                <PlusIcon className="h-5" />
            </div>
            Add To Cart
        </motion.button>
    )
}

export const AddToCart = ({ product }: { product: Product }) => {
    const { variants, availableForSale } = product
    const { addCartItem } = useCart()
    const { state } = useProduct()
    const [message, formAction] = useFormState(addItem, null)
    const variant = variants.find((variant: ProductVariant) =>
        variant.selectedOptions.every(
            (option) => option.value === state[option.name.toLowerCase()]
        )
    )
    const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
    const selectedVariantId = variant?.id || defaultVariantId
    const actionWithVariant = formAction.bind(null, selectedVariantId)
    const finalVariant = variants.find(
        (variant) => variant.id === selectedVariantId
    )!

    return (
        <motion.form
            action={async () => {
                addCartItem(finalVariant, product)
                await actionWithVariant()
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <SubmitButton
                availableForSale={availableForSale}
                selectedVariantId={selectedVariantId}
            />
            <p className="sr-only" role="status" aria-label="polite">
                {message}
            </p>
        </motion.form>
    )
}