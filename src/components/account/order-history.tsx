import { ChevronRight, HelpCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"

export const OrderHistory = () => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <CardTitle>Order History</CardTitle>
                <Button variant="ghost" size="icon">
                    <HelpCircle className="h-4 w-4" />
                </Button>
            </div>
            <CardDescription>View and manage your past orders</CardDescription>
            <ScrollArea className="h-[400px] w-full mt-4">
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <Card key={i} className="relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                            <CardHeader>
                                <CardTitle className="text-lg">Order #{1000 + i}</CardTitle>
                                <CardDescription>Placed on: {new Date().toLocaleDateString()}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Status: Delivered</p>
                                <p>Total: $99.99</p>
                                <Button variant="link" className="p-0 h-auto font-normal">
                                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </>
    )
}
