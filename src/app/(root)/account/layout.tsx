import { AccountLeftSidebar } from '@/components/account/left-sidebar'
import React from 'react'
import { AccountClient } from './client';

type Props = {
    children: React.ReactNode
}

const AccountLayout = ({ children }: Props) => {
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-6 min-h-[550px]">
                <AccountLeftSidebar
                />
                <AccountClient>
                    {children}
                </AccountClient>
            </div>
        </div>

    )
}

export default AccountLayout