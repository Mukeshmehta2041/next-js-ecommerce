"use client"

import { createCustomer, fetchCustomer, loginCustomer } from "@/lib/shopify"
import { useSession } from "next-auth/react";

const Page = () => {
    const { data: session } = useSession();

    if (!session) {
        return <p>You are not logged in</p>;
    }



    const onClick = async () => {
        const result = await createCustomer("John", "Doe", "johndoe@example.com", "securePassword123", true)


    }

    const onLogin = async () => {
        try {
            // const result = await loginCustomer("mukeshmehta2041@gmail.com", "mukeshkdr1234");
            const result = await fetchCustomer("a4fb3075fd375d03c5ea657c66b918f6")
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div>
            <h2>Test Page</h2>
            <div className="flex flex-col gap-y-4">

                <button
                    onClick={onClick}
                >create customers</button>

                <button
                    onClick={onLogin}
                >login</button>
            </div>

            <div>
                <h1>Welcome, {session.user.firstName} {session.user.lastName}</h1>
                <p>Email: {session.user.email}</p>
            </div>

        </div>
    )
}

export default Page