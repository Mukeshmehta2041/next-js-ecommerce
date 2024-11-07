import { auth } from '@/auth'
import { fetchCustomer } from '@/lib/shopify'
import React from 'react'

const TestPage = async () => {
    const session = await auth()
    const result = await fetchCustomer(session?.user.accessToken!)
    return (
        <div>TestPage</div>
    )
}

export default TestPage