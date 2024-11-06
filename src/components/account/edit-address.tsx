'use client'

import { Check, Edit, Plus, Trash, X } from "lucide-react"
import { useState } from 'react'
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

interface Address {
    id: string
    name: string
    address1: string
    address2?: string
    city: string
    province: string
    zip: string
    country: string
    phone?: string
}

interface AddressListProps {
    initialAddresses: Address[]
}

export const AddressList: React.FC<AddressListProps> = ({ initialAddresses }) => {
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
    const [editingId, setEditingId] = useState<string | null>(null)

    const handleEdit = (id: string) => {
        setEditingId(id)
    }

    const handleCancelEdit = () => {
        setEditingId(null)
    }

    const handleSaveEdit = (id: string, updatedAddress: Address) => {
        setAddresses(addresses.map(addr =>
            addr.id === id ? { ...addr, ...updatedAddress } : addr
        ))
        setEditingId(null)
    }

    const handleDelete = (id: string) => {
        setAddresses(addresses.filter(addr => addr.id !== id))
    }

    return (
        <>
            <div className="flex justify-between items-center mb-4">
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
                            {editingId === address.id ? (
                                <EditAddressForm
                                    address={address}
                                    onSave={(updatedAddress) => handleSaveEdit(address.id, updatedAddress)}
                                    onCancel={handleCancelEdit}
                                />
                            ) : (
                                <>
                                    <p>{address.address1}</p>
                                    {address.address2 && <p>{address.address2}</p>}
                                    <p>{`${address.city}, ${address.province} ${address.zip}`}</p>
                                    <p>{address.country}</p>
                                    {address.phone && <p>Phone: {address.phone}</p>}
                                    <div className="mt-2 flex space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(address.id)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(address.id)}>
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}

interface EditAddressFormProps {
    address: Address
    onSave: (updatedAddress: Address) => void
    onCancel: () => void
}

const EditAddressForm: React.FC<EditAddressFormProps> = ({ address, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Address>(address)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="address1">Address Line 1</Label>
                <Input id="address1" name="address1" value={formData.address1} onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="address2">Address Line 2</Label>
                <Input id="address2" name="address2" value={formData.address2 || ''} onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="province">Province/State</Label>
                <Input id="province" name="province" value={formData.province} onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="zip">ZIP/Postal Code</Label>
                <Input id="zip" name="zip" value={formData.zip} onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={formData.country} onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone || ''} onChange={handleChange} />
            </div>
            <div className="flex space-x-2">
                <Button type="submit" size="sm">
                    <Check className="mr-2 h-4 w-4" />
                    Save
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={onCancel}>
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                </Button>
            </div>
        </form>
    )
}
