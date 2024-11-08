import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Product } from "@/lib/shopify/types";

export const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="aspect-square relative">
                    <Image
                        src={product.featuredImage.url}
                        alt={product.title}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="font-bold">
                    {new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                    }).format(Number(product.priceRange.minVariantPrice.amount))}
                </div>
                <Button asChild>
                    <Link href={`/product/${product.handle}`}>View Product</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};
