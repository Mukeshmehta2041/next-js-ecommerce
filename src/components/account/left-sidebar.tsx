"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useActiveTab } from '@/hooks/use-active-tab'
import { ClipboardList, CreditCard, LogOut, MapPin, User } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { ForwardRefExoticComponent, SVGProps } from 'react'

export type TabItem = {
    id: string;
    label: string;
    icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    tooltip: string;
};

const items: TabItem[] = [
    { id: "order-history", label: "Order History", icon: ClipboardList, tooltip: "View your past orders" },
    { id: "personal-info", label: "Personal Information", icon: User, tooltip: "Manage your personal details" },
    { id: "address", label: "Address", icon: MapPin, tooltip: "Manage your shipping addresses" },
    { id: "payments", label: "Payments", icon: CreditCard, tooltip: "Manage your payment methods" },
]


export const AccountLeftSidebar = () => {
    const { activeTab, setActiveTab } = useActiveTab()

    const { data: session } = useSession()
    const router = useRouter()

    console.log("Session", session);


    const name = React.useMemo(() => `${session?.user?.firstName} ${session?.user?.lastName}`, [session]);

    const handleSignOut = async () => {
        await signOut();
        router.push("/")
    }
    return (
        <Card className="w-full lg:w-64 flex-shrink-0 max-h-[350px]">
            <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                        <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-lg">Welcome back,</CardTitle>
                        <CardDescription>{name}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Tabs orientation="vertical" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="flex flex-col gap-1 items-stretch h-full bg-transparent px-3">
                        {items?.map((tab) => (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className="justify-start data-[state=active]:bg-slate-700 data-[state=active]:text-primary-foreground h-8"
                            >
                                <tab.icon className="mr-2 h-4 w-4" />
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
                <Separator className="my-4" />
                <div className="px-4 pb-4">
                    <Button variant="outline" className="w-full" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </CardContent>
        </Card>

    )
}
