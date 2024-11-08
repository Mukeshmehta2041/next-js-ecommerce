import { productFragment } from "../fragments/product";

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;


export const getProductsQuery = /* GraphQL */ `
  query getProducts(
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
  ) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;


export const getProductsByCollectionQuery = `
    query getProductsByCollection($collectionHandle: String!) {
        collection(handle: $collectionHandle) {
            products(first: 10) {
                edges {
                    node {
                        id
                        title
                        descriptionHtml
                        handle
                        variants(first: 1) {
                            edges {
                                node {
                                    priceV2 {
                                        amount
                                    }
                                }
                            }
                        }
                        images(first: 1) {
                            edges {
                                node {
                                    src
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;