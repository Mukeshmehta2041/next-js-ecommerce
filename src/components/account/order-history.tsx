import { ChevronRight, HelpCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"

export const OrderHistory = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Order History</CardTitle>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                    <HelpCircle className="h-5 w-5" />
                </Button>
            </div>
            <CardDescription className="text-gray-600">View and manage your past orders</CardDescription>
            <ScrollArea className="h-[500px] w-full pr-4">
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <Card key={i} className="relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#e8b17d]" />
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl font-semibold text-gray-800">Order #{1000 + i}</CardTitle>
                                <CardDescription className="text-sm text-gray-500">
                                    Placed on: {new Date().toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 mb-2">Status: <span className="font-medium text-green-600">Delivered</span></p>
                                <p className="text-gray-700 mb-4">Total: <span className="font-medium">$99.99</span></p>
                                <Button variant="link" className="p-0 h-auto font-normal text-[#e8b17d] hover:text-[#d49a66]">
                                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}