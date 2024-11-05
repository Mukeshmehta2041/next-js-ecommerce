import { Footer } from '@/components/shared/footer/footer'
import { Navbar } from '@/components/shared/navbar/navbar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <main>
            <Navbar />
            <div>{children}</div>
            <Footer />
        </main>
    )
}

export default layout