'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <html>
            <body className="flex min-h-screen items-center justify-center" style={{ backgroundColor: '#f6f1eb' }}>
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold">Oops! Something went wrong</h1>
                    <p className="mb-8 text-xl">{error.message || "We're sorry, but an unexpected error occurred."}</p>
                    <div className="space-x-4">
                        <Button onClick={() => reset()} variant="outline">
                            Try again
                        </Button>
                        <Button onClick={() => window.location.href = '/'}>
                            Go to Homepage
                        </Button>
                    </div>
                    {error.digest && (
                        <p className="mt-4 text-sm text-gray-500">Error ID: {error.digest}</p>
                    )}
                </div>
            </body>
        </html>
    )
}