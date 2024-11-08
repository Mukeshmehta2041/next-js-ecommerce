import React from 'react'
import { AccountLeftSidebar } from '@/components/account/left-sidebar'
import { AccountClient } from './client'

type Props = {
    children: React.ReactNode
}

const AccountLayout = ({ children }: Props) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/4 bg-[#e8e0d5000] p-8 min-h-[550px]">
                    <AccountLeftSidebar />
                </div>
                <div className="lg:w-3/4 p-8">
                    <AccountClient>{children}</AccountClient>
                </div>
            </div>
        </div>
    )
}

export default AccountLayout