import { auth } from '@/auth'
import { Address } from '@/components/account/address'
import { OrderHistory } from '@/components/account/order-history'
import { Payments } from '@/components/account/payment'
import { PersonalInfo } from '@/components/account/personal-info'
import { TabsContent } from '@/components/ui/tabs'
import { redirect } from 'next/navigation'

const AccountPage = async () => {
    const session = await auth()

    if (!session) {
        redirect("/account/login")
    }

    return (
        <div className="space-y-8">
            <TabsContent value="order-history">
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
            </TabsContent>
        </div>
    )
}

export default AccountPage