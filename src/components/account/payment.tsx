import { Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export const Payments = () => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <CardTitle>Payments</CardTitle>
                <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                </Button>
            </div>
            <CardDescription>Manage your payment methods</CardDescription>
            <div className="mt-4 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Credit Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>**** **** **** 1234</p>
                        <p>Expires: 12/2025</p>
                        <Button variant="outline" size="sm" className="mt-2">
                            <Trash className="mr-2 h-4 w-4" />
                            Remove
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}