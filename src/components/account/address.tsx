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
        </>
    )
}