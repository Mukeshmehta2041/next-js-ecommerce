import { BannerSlider } from '@/components/collection/banner-slider'
import { CollectionCarousel } from '@/components/collection/collection-list'
import NewArrivals from '@/components/new-arrivals'
import { FeaturedProductList } from '@/components/product/featured-product-list'
import { getProducts } from '@/lib/shopify'
import React from 'react'

const HomePage = async () => {

  const products = await getProducts({})

  return (
    <div className="w-full h-full">
      <div className='flex w-full h-full flex-col gap-y-6'>
        <BannerSlider />
        <CollectionCarousel />
        <NewArrivals />
        <FeaturedProductList
          products={products || []}
        />
      </div>
    </div>
  )
}

export default HomePage