import { collectionFragment } from "../fragments/collection";
import { productFragment } from "../fragments/product";

export const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections(first: 100, sortKey: TITLE) {
      edges {
        node {
          ...collection
        }
      }
    }
  }
  ${collectionFragment}
`;

// sortKey: $sortKey, reverse: $reverse, 

// $sortKey: ProductCollectionSortKeys
// $reverse: Boolean


export const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionProducts(
    $handle: String!
  ) {
    collection(handle: $handle) {
      products(
      first: 100
      ) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;
