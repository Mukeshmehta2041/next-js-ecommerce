'use client'

import { ShoppingCart, Minus, Plus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCart } from './cart-context'
import Image from 'next/image'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { createUrl } from '@/lib/utils'
import { DEFAULT_OPTION } from '@/lib/constants'
import { createCartAndSetCookie, redirectToCheckout } from '@/lib/actions/cart.action'
import { EditItemQuantityButton } from './edit-quantity-button'
import { DeleteItemButton } from './delete-item-button'

type MerchandiseSearchParams = {
    [key: string]: string
}

export const CartModal = () => {
    const { cart, updateCartItem } = useCart()
    const [isOpen, setIsOpen] = useState(false)
    const quantityRef = useRef(cart?.totalQuantity)

    useEffect(() => {
        if (!cart) {
            createCartAndSetCookie()
        }
    }, [cart])

    useEffect(() => {
        if (cart?.totalQuantity && cart?.totalQuantity !== quantityRef.current && cart?.totalQuantity > 0) {
            if (!isOpen) {
                setIsOpen(true)
            }
            quantityRef.current = cart?.totalQuantity
        }
    }, [isOpen, cart?.totalQuantity, quantityRef])

    const total = cart?.totalQuantity ?? 0

    const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const result = await redirectToCheckout()
        if (result === "Missing cart ID" || result === "Error fetching cart") {
            console.error(result)
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="relative bg-[#f6f1eb] hover:bg-[#e6e1db] text-[#4a4a4a] border-[#d6d1cb]"
                >
                    <ShoppingCart className="h-4 w-4" />
                    {total > 0 && (
                        <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-[#8b7b6b] text-xs text-white flex items-center justify-center">
                            {total}
                        </span>
                    )}
                    <span className="sr-only">Open cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md bg-[#f6f1eb] border-l border-[#d6d1cb] pb-12">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold text-[#4a4a4a]">My Cart</SheetTitle>
                </SheetHeader>
                {!cart || cart.lines.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <ShoppingCart className="h-16 w-16 text-[#a0a0a0]" />
                        <p className="mt-6 text-center text-2xl font-bold text-[#4a4a4a]">Your Cart is Empty</p>
                    </div>
                ) : (
                    <div className="flex flex-col h-full">
                        <ScrollArea className="flex-grow pr-4">
                            <ul className="divide-y divide-[#d6d1cb]">
                                {cart.lines
                                    .sort((a, b) => a.merchandise.product.title.localeCompare(b.merchandise.product.title))
                                    .map((item, i) => {
                                        const merchandiseSearchParams = {} as MerchandiseSearchParams
                                        item.merchandise.selectedOptions.forEach(({ name, value }) => {
                                            if (value !== DEFAULT_OPTION) {
                                                merchandiseSearchParams[name.toLowerCase()] = value
                                            }
                                        })
                                        const merchandiseUrl = createUrl(
                                            `/product/${item.merchandise.product.handle}`,
                                            new URLSearchParams(merchandiseSearchParams)
                                        )

                                        return (
                                            <li key={i} className="py-4">
                                                <div className="relative flex w-full flex-row justify-between px-1 py-4">
                                                    <DeleteItemButton
                                                        item={item}
                                                        optimisticUpdate={updateCartItem}
                                                    />
                                                </div>                                                <div className="flex items-center space-x-4">
                                                    <div className="relative h-20 w-20 overflow-hidden rounded-md border border-[#d6d1cb] bg-white">
                                                        <Image
                                                            className="h-full w-full object-cover"
                                                            width={80}
                                                            height={80}
                                                            alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                                                            src={item.merchandise.product.featuredImage.url}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <Link
                                                            href={merchandiseUrl}
                                                            onClick={() => setIsOpen(false)}
                                                            className="text-sm font-medium text-[#4a4a4a] hover:text-[#8b7b6b] transition-colors"
                                                        >
                                                            {item.merchandise.product.title}
                                                        </Link>
                                                        {item.merchandise.title !== DEFAULT_OPTION && (
                                                            <p className="text-sm text-[#7a7a7a]">{item.merchandise.title}</p>
                                                        )}
                                                        <div className="mt-1 flex items-center justify-between">
                                                            <div className="text-sm font-semibold text-[#4a4a4a]">
                                                                ${parseFloat(item.cost.totalAmount.amount).toFixed(2)}
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <EditItemQuantityButton
                                                                    item={item}
                                                                    type="minus"
                                                                    optimisticUpdate={updateCartItem}
                                                                />
                                                                <span className="w-8 text-center text-[#4a4a4a]">{item.quantity}</span>
                                                                <EditItemQuantityButton
                                                                    item={item}
                                                                    type="plus"
                                                                    optimisticUpdate={updateCartItem}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                            </ul>
                        </ScrollArea>
                        <div className="mt-6 space-y-4">
                            <Separator className="bg-[#d6d1cb]" />
                            <div className="flex justify-between text-sm text-[#4a4a4a]">
                                <span>Taxes</span>
                                <span>${parseFloat(cart.cost.totalTaxAmount.amount).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-[#4a4a4a]">
                                <span>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <Separator className="bg-[#d6d1cb]" />
                            <div className="flex justify-between font-medium text-[#4a4a4a]">
                                <span>Total</span>
                                <span>${parseFloat(cart.cost.totalAmount.amount).toFixed(2)}</span>
                            </div>
                            <form onSubmit={handleCheckout}>
                                <CheckoutButton />
                            </form>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}

function CheckoutButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            className="w-full bg-[#8b7b6b] hover:bg-[#6b5d4e] text-white font-semibold py-3 rounded-lg transition-colors"
            type="submit"
            disabled={pending}
        >
            {pending ? 'Processing...' : 'Proceed to Checkout'}
        </Button>
    )
}