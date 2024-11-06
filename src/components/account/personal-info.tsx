import { auth } from "@/auth"
import { fetchCustomer } from "@/lib/shopify"
import { PersonalInfoForm } from "./customer-info-form"

export const PersonalInfo = async () => {
    const session = await auth();

    if (!session) {
        return null;
    }

    const customer = await fetchCustomer(session.user.accessToken!)

    console.log("customer", customer);


    const isEditing = false;

    return (
        <>
            <PersonalInfoForm
                initialCustomer={customer}
            />
        </>
    )
}
