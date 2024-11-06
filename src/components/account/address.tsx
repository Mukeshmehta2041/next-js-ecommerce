import { Edit, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { fetchAllAddresses } from "@/lib/shopify"
import { AddressList } from "./edit-address"

export const Address = async () => {
    const addresses = await fetchAllAddresses()

    return (
        <>
            <AddressList
                initialAddresses={addresses}
            />
            {/* <div className="flex justify-between items-center">
                <CardTitle>Address</CardTitle>

                <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Address
                </Button>

            </div>
            <CardDescription>Manage your shipping addresses.</CardDescription>
            <div className="mt-4 space-y-4">
                {addresses.map((address) => (
                    <Card key={address.id}>
                        <CardHeader>
                            <CardTitle>{address.name}'s Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{address.address1}</p>
                            {address.address2 && <p>{address.address2}</p>}
                            <p>{`${address.city}, ${address.province} ${address.zip}`}</p>
                            <p>{address.country}</p>
                            {address.phone && <p>Phone: {address.phone}</p>}
                            <div className="mt-2 flex space-x-2">

                                <Button variant="outline" size="sm">
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>


                                <Button variant="outline" size="sm">
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                </Button>

                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div> */}
        </>
    )
}