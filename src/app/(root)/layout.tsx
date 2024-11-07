import { CartProvider } from '@/components/cart/cart-context'
import { Footer } from '@/components/shared/footer/footer'
import { Navbar } from '@/components/shared/navbar/navbar'
import { getCart } from '@/lib/shopify'
import { cookies } from 'next/headers'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    const cartId = cookies().get("cartId")?.value;
    const cart = getCart(cartId);
    return (
        <CartProvider cartPromise={cart}>
            <main>
                <Navbar />
                <div>{children}</div>
                <Footer />
            </main>
        </CartProvider>
    )
}

export default layout