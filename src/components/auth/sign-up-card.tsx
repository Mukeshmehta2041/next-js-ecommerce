"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { createCustomer } from "@/lib/shopify"
import { TriangleAlert, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export const SignUpCard = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const onCredentialsSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError(false)

        try {
            const customer = await createCustomer(firstName, lastName, email, password)
            console.log("customer", customer);

            if (customer) {
                signIn("credentials", {
                    email: email,
                    password: password,
                    callbackUrl: "/",
                })
            }
        } catch (error: any) {
            console.error("Sign up error:", error)
            setError(true)
            setErrorMessage(error?.message || "An error occurred during sign up.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            {error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlert className="size-4" />
                    <p>{errorMessage}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onCredentialsSignUp} className="space-y-2.5">
                    <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        type="text"
                        required
                    />
                    <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        type="text"
                        required
                    />
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                        minLength={3}
                        maxLength={20}
                    />
                    <Button
                        type="submit"
                        variant="sandstone"
                        className="w-full"
                        size="lg"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Continue"
                        )}
                    </Button>
                </form>
                <Separator />
                <p className="text-xs text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/account/login">
                        <span className="text-sky-700 hover:underline">Sign in</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}
