import { Product } from "@/lib/shopify/types"
import { ProductCard } from "./product-card"

export const ProductGrid = ({ products }: {
    products: Product[],
}) => {
    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-4">No products found</h2>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
