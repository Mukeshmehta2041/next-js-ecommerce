export const createCustomerMutation = `
  mutation createCustomer($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
      }
      userErrors {
        field
        message
      }
    }
  }
`;
