// import { CategoryList } from '@/components/category/category-list'
import { ProductList } from '@/components/products/product-list'
// import { ProductList } from '@/components/products/product-list'
import React from 'react'

const HomePage = () => {
  return (
    <div className="">
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <ProductList />
      </div>

      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categories
        </h1>
        {/* <CategoryList /> */}
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        {/* <ProductList /> */}
      </div>

    </div>
  )
}

export default HomePage