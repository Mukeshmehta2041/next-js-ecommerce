'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs } from '@/components/ui/tabs'
import { useActiveTab } from '@/hooks/use-active-tab'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export const AccountClient = ({ children }: Props) => {
    const { activeTab, setActiveTab } = useActiveTab()

    const handleSignOut = () => {
    }

    return (
        <Card className="flex-grow" >
            <CardContent className="p-6">
                <Tabs value={activeTab} className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* <TabsContent value="order-history">
                                <OrderHistory />
                            </TabsContent>
                            <TabsContent value="personal-info">
                                <PersonalInfo />
                            </TabsContent>
                            <TabsContent value="address">
                                <Address />
                            </TabsContent>
                            <TabsContent value="payments">
                                <Payments />
                            </TabsContent> */}
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </Tabs>
            </CardContent>
        </Card >
    )
}



