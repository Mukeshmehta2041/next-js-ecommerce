'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateCustomer } from "@/lib/shopify"
import clsx from "clsx"
import { Edit, Loader2, Save } from 'lucide-react'
import { useState } from 'react'

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
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [customer, setCustomer] = useState(initialCustomer)
    const [error, setError] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)
        setError('')
        try {
            const result = await updateCustomer({
                email: customer.email,
                firstName: customer.firstName,
                lastName: customer.lastName,
                phone: customer.phone || "",
            }, token)
            console.log("Customer saved", result)
            setIsEditing(false)
        } catch (error) {
            console.error(error)
            setError('Failed to update information. Please try again.')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <>
            <div className="flex justify-between items-center ">
                <CardTitle className="text-2xl font-bold text-gray-800">Personal Information</CardTitle>
                <Button variant="outline" size="sm"
                    className="bg-white hover:bg-[#e8e0d5] text-gray-700"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </>
                    )}
                </Button>
            </div>
            <CardDescription className="text-gray-600 mt-1">Manage your personal details.</CardDescription>

            {error && (
                <p className="text-red-500 mb-4 p-2 text-sm bg-red-50 rounded" role="alert">{error}</p>
            )}

            <div className="mt-4 space-y-4">

                {isEditing ? (
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={customer.firstName || ''}
                                    onChange={handleChange}
                                    required
                                    className="border-[#e8e0d5] focus:border-[#d4c3a3] focus:ring-[#d4c3a3]"
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
                                    className="border-[#e8e0d5] focus:border-[#d4c3a3] focus:ring-[#d4c3a3]"
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
                                className="border-[#e8e0d5] focus:border-[#d4c3a3] focus:ring-[#d4c3a3]"
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
                                className="border-[#e8e0d5] focus:border-[#d4c3a3] focus:ring-[#d4c3a3]"
                            />
                        </div>
                        <Button
                            type="submit" disabled={isSaving}
                            className="bg-[#8b7b6b] hover:bg-[#6b5d4e]"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    Save Changes
                                </>
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