import { defaultSort, sorting } from '@/lib/constants'
import { getCollectionProducts } from '@/lib/shopify'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { ProductGrid } from '@/components/grid/product-grid'
import { SortSelect } from '@/components/sort-select'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorBoundary } from '@/components/error-boundary'

type Props = {
    params: {
        handle: string
    }
    searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CollectionPage({ params: { handle }, searchParams }: Props) {
    const { sort } = searchParams as { [key: string]: string }
    const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort

    try {
        const products = await getCollectionProducts({
            collection: handle,
            sortKey,
            reverse,
        })

        if (!products) {
            notFound()
        }

        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">{handle.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</h1>
                    <SortSelect
                        currentSort={sort || defaultSort?.slug!}
                    // onSortChange={(newSort) => {
                    //     console.log('Sort changed to:', newSort)
                    // }}
                    />
                </div>
                <Suspense
                    fallback={
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <Skeleton key={index} className="h-[300px] w-full" />
                            ))}
                        </div>
                    }
                >
                    <ProductGrid products={products} />
                </Suspense>
            </div>
        )
    } catch (error: any) {
        return <ErrorBoundary error={error} />
    }
}