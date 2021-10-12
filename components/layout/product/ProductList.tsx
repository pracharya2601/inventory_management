import { ProductType } from "@/interface/Product/ProductInterface";
import React, { useState } from "react";
import ProductRow from "./ProductRow";


const ProductList = ({ productList }: { productList: any[] }) => {
  const [products, setProducts] = useState(productList || [])

  return (
    <>
      {products.map((item: ProductType) => (
        <ProductRow key={item._id} item={item} />
      ))}
    </>
  )
}

export default ProductList;