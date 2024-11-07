'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchCustomer, updateCustomer } from "@/lib/shopify"
import { Loader2 } from 'lucide-react'

type Props = {
    initialCustomer: {
        firstName: string
        lastName: string
        email: string
        phone?: string
    }
    token: string
}

export const PersonalInfoForm = ({ initialCustomer, token }: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [customer, setCustomer] = useState(initialCustomer)
    const [error, setError] = useState('')


    const handleChange = (e: any) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        try {
            const result = await updateCustomer({
                email: customer.email,
                firstName: customer.firstName,
                lastName: customer.lastName,
                phone: customer.phone || "",
            }, token)

            console.log("Customer saved", result);

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <>
            <div className="flex justify-between items-center ">
                <CardTitle>Personal Information</CardTitle>
                <Button variant="outline" size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </Button>
            </div>
            <CardDescription>Manage your personal details.</CardDescription>

            {error && (
                <p className="text-red-500 mb-4" role="alert">{error}</p>
            )}

            <div className="mt-4 space-y-4">

                {isEditing ? (
                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={customer.firstName || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={customer.lastName || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={customer.email || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={customer.phone || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </form>
                ) : (
                    <Card>
                        <CardContent className="pt-6">

                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">First Name</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{customer.firstName || 'N/A'}</dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">Last Name</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{customer.lastName || 'N/A'}</dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">Email Address</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{customer.email || 'N/A'}</dd>
                                </div>
                                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6">Phone Number</dt>
                                    <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">{customer.phone || 'N/A'}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                )}
            </div>


        </>

    )
}