import { Navbar } from '@/components/shared/navbar/navbar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <main>
            <Navbar />
            <div></div>
        </main>
    )
}

export default layout