export const getMenuQuery = /* GraphQL */ `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`;


export const getNestedMenuQuery = /* GraphQL */ `
query getMenu($handle: String!) {
    menu(handle: $handle) {
        items {
            title
            url
            id
            items {
                id
                resourceId
                title
                type
                url
            }
        }
    }
}
`;