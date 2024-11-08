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

    return (
        <Card className="bg-white rounded-2xl shadow-md overflow-hidden">
            <CardContent className="p-0">
                <Tabs value={activeTab} className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="p-6"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </Tabs>
            </CardContent>
        </Card>
    )
}