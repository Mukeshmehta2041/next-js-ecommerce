export type Menu = {
    title: string;
    path: string;
};


export type Edge<T> = {
    node: T;
};

export type Connection<T> = {
    edges: Array<Edge<T>>;
};


export type ShopifyProductOperation = {
    data: { product: ShopifyProduct };
    variables: {
        handle: string;
    };
};

export type ShopifyMenuOperation = {
    data: {
        menu?: {
            items: {
                title: string;
                url: string;
            }[];
        };
    };
    variables: {
        handle: string;
    };
};

export type SEO = {
    title: string;
    description: string;
};

export type ShopifyCollection = {
    handle: string;
    title: string;
    description: string;
    seo: SEO;
    updatedAt: string;
};

export type Collection = ShopifyCollection & {
    path: string;
};

export type ShopifyCollectionsOperation = {
    data: {
        collections: Connection<ShopifyCollection>;
    };
};

export type ProductOption = {
    id: string;
    name: string;
    values: string[];
};

export type Money = {
    amount: string;
    currencyCode: string;
};

export type ProductVariant = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: {
        name: string;
        value: string;
    }[];
    price: Money;
};

export type Image = {
    url: string;
    altText: string;
    width: number;
    height: number;
};

export type ShopifyProduct = {
    id: string;
    handle: string;
    availableForSale: boolean;
    title: string;
    description: string;
    descriptionHtml: string;
    options: ProductOption[];
    priceRange: {
        maxVariantPrice: Money;
        minVariantPrice: Money;
    };
    variants: Connection<ProductVariant>;
    featuredImage: Image;
    images: Connection<Image>;
    seo: SEO;
    tags: string[];
    updatedAt: string;
};

export type Product = Omit<ShopifyProduct, "variants" | "images"> & {
    variants: ProductVariant[];
    images: Image[];
};


export type Page = {
    id: string;
    title: string;
    handle: string;
    body: string;
    bodySummary: string;
    seo?: SEO;
    createdAt: string;
    updatedAt: string;
};

export type ShopifyPageOperation = {
    data: { pageByHandle: Page };
    variables: { handle: string };
};


export type ShopifyPagesOperation = {
    data: {
        pages: Connection<Page>;
    };
};