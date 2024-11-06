import { useToken } from "@/hooks/use-token";
import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "../constants";
import { isShopifyError } from "../type-guards";
import { ensureStartWith } from "../utils";
import { createCustomerMutation } from "./mutations/customer";
import { getCollectionsQuery } from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import { getPageQuery, getPagesQuery } from "./queries/page";
import { getProductQuery, getProductsQuery } from "./queries/product";
import { Collection, Connection, Image, Menu, Page, Product, ShopifyCollection, ShopifyCollectionsOperation, ShopifyMenuOperation, ShopifyPageOperation, ShopifyPagesOperation, ShopifyProduct, ShopifyProductOperation, ShopifyProductsOperation } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN
    ? ensureStartWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
    : "";


type ExtractVariables<T> = T extends { variables: object }
    ? T["variables"]
    : never;
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;


function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
    return array.edges.map((edge) => edge?.node);
}

function reshapeCollection(
    collection: ShopifyCollection
): Collection | undefined {
    if (!collection) return undefined;

    return {
        ...collection,
        path: `/search/${collection.handle}`,
    };
}



function reshapeCollections(collections: ShopifyCollection[]) {
    const reshapedCollections = [];

    for (const collection of collections) {
        if (collection) {
            const reshapedCollection = reshapeCollection(collection);

            if (reshapedCollection) {
                reshapedCollections.push(reshapedCollection);
            }
        }
    }

    return reshapedCollections;
}

function reshapeImages(images: Connection<Image>, productTitle: string) {
    const flattened = removeEdgesAndNodes(images);

    return flattened.map((image) => {
        const filename = image.url.match(/.*\/(.*)\..*/)?.[1];

        return {
            ...image,
            altText: image.altText || `${productTitle} - ${filename}`,
        };
    });
}

function reshapeProduct(
    product: ShopifyProduct,
    filterHiddenProducts: boolean = true
) {
    if (
        !product ||
        (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
    ) {
        return undefined;
    }

    const { images, variants, ...rest } = product;

    return {
        ...rest,
        images: reshapeImages(images, product.title),
        variants: removeEdgesAndNodes(variants),
    };
}

function reshapeProducts(products: ShopifyProduct[]) {
    const reshapedProducts = [];

    for (const product of products) {
        if (product) {
            const reshapedProduct = reshapeProduct(product);

            if (reshapedProduct) {
                reshapedProducts.push(reshapedProduct);
            }
        }
    }

    return reshapedProducts;
}

export async function shopifyFetch<T>({
    cache = "force-cache",
    headers,
    query,
    tags,
    variables,
}: {
    cache?: RequestCache;
    headers?: HeadersInit;
    query: string;
    tags?: string[];
    variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
    try {
        const result = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": key,
                ...headers,
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables }),
            }),
            cache,
            ...(tags && { next: { tags } }),
        });

        const body = await result.json();

        if (body.errors) {
            throw body.errors[0];
        }

        return {
            status: result.status,
            body,
        };
    } catch (error) {
        if (isShopifyError(error)) {
            throw {
                cause: error.cause?.toString() || "unknown",
                status: error.status || 500,
                message: error.message,
                query,
            };
        }

        throw {
            error,
            query,
        };
    }
}

export const getMenu = async (handle: string): Promise<Menu[]> => {
    const res = await shopifyFetch<ShopifyMenuOperation>({
        query: getMenuQuery,
        tags: [TAGS.collections],
        variables: {
            handle,
        },
    });


    return (
        res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
            title: item.title,
            path: item.url
                .replace(domain, "")
                .replace("/collections", "/search")
                .replace("/pages", ""),
        })) || []
    );
}

export const getCollections = async (): Promise<Collection[]> => {
    const res = await shopifyFetch<ShopifyCollectionsOperation>({
        query: getCollectionsQuery,
        tags: [TAGS.collections],
    });

    const shopifyCollections = removeEdgesAndNodes(res?.body?.data?.collections);

    const collections = [
        {
            handle: "",
            title: "All",
            description: "All products",
            seo: {
                title: "All",
                description: "All products",
            },
            path: "/search",
            updatedAt: new Date().toISOString(),
        },
        // Filter out the hidden products
        ...reshapeCollections(shopifyCollections).filter(
            (collection) => !collection.handle.startsWith("hidden")
        ),
    ]

    return collections;
}

export const getProduct = async (handle: string): Promise<Product | undefined> => {
    const res = await shopifyFetch<ShopifyProductOperation>({
        query: getProductQuery,
        tags: [TAGS.products],
        variables: {
            handle,
        },
    });
    return reshapeProduct(res.body.data.product, false);
}


export async function getPage(handle: string): Promise<Page> {
    const res = await shopifyFetch<ShopifyPageOperation>({
        query: getPageQuery,
        cache: "no-store",
        variables: { handle },
    });

    return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
    const res = await shopifyFetch<ShopifyPagesOperation>({
        query: getPagesQuery,
        cache: "no-store",
    });

    return removeEdgesAndNodes(res.body.data.pages);
}


export async function getProducts({
    query,
    reverse,
    sortKey,
}: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
}): Promise<Product[]> {
    const res = await shopifyFetch<ShopifyProductsOperation>({
        query: getProductsQuery,
        tags: [TAGS.products],
        variables: {
            query,
            reverse,
            sortKey,
        },
    });


    return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function createCustomer(firstName: string, lastName: string, email: string, password: string, acceptsMarketing: boolean = true) {
    const url = endpoint
    const headers = {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
    };

    const query = `
    mutation {
      customerCreate(input: {
        firstName: "${firstName}",
        lastName: "${lastName}",
        email: "${email}",
        password: "${password}",
        acceptsMarketing: ${acceptsMarketing}
      }) {
        customer {
          id
          firstName
          lastName
          email
          phone
          tags
          createdAt
          updatedAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (data.errors) {
            console.error('Error creating customer:', data.errors);
            throw new Error(data.errors[0].message);
        }
        return data.data.customerCreate.customer;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
}


export async function loginCustomer(email: string, password: string) {
    const url = endpoint
    const headers = {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
    };

    const query = `
    mutation {
      customerAccessTokenCreate(input: {
        email: "${email}",
        password: "${password}"
      }) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ query }),
        });


        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error logging in customer:', error);
        throw error;
    }
}

export async function fetchCustomer(accessToken: string) {
    const url = endpoint;
    const headers = {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
    };

    const query = `
    query {
      customer(customerAccessToken: "${accessToken}") {
        id
        email
        firstName
        lastName
        phone
      }
    }
  `;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (data.errors) {
            console.error('Error fetching customer data:', data.errors);
            throw new Error(data.errors[0].message);
        }
        return data.data.customer;
    } catch (error) {
        console.error('Error fetching customer data:', error);
        throw error;
    }
}


export async function getCustomerWithBillingAddress(accessToken: string) {
    const url = endpoint;
    const headers = {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
    };


    const query = `
    query {
      customer(customerAccessToken: "${accessToken}") {
        id
        email
        firstName
        lastName
        phone
        addresses(first: 5) {
          edges {
            node {
              id
              address1
              address2
              city
              province
              country
              zip
              phone
              # Customize this based on your billing address criteria
              name
            }
          }
        }
      }
    }
`;


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (data.errors) {
            console.error('Error fetching customer data:', data.errors);
            throw new Error(data.errors[0].message);
        }

        return data
    } catch (error) {
        console.error('Error fetching customer with billing address:', error);
        throw error;
    }
}


export async function fetchAllAddresses() {
    const accessToken = await useToken()
    const url = endpoint;
    const headers = {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
    };

    const query = `
    query {
      customer(customerAccessToken: "${accessToken}") {
        addresses(first: 5) {
          edges {
            node {
              id
              address1
              address2
              city
              province
              country
              zip
              phone
              name
            }
          }
        }
      }
    }
  `;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ query }),
        });

        const data = await response.json();
        if (data.errors) {
            console.error('Error fetching customer addresses:', data.errors);
            throw new Error(data.errors[0].message);
        }



        return data.data.customer.addresses.edges.map((edge: any) => edge.node);
    } catch (error) {
        console.error('Error fetching customer with billing address:', error);
        throw error;
    }
}
