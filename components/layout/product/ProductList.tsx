import { ProductType } from '@/interface/Product/ProductInterface';
import React, { useContext } from 'react';
import ProductRow from './ProductRow';
import { productcontext } from '@context/data';

const ProductList = () => {
    const { productList } = useContext(productcontext);
    return (
        <>
            {productList.map((item: ProductType) => (
                <ProductRow key={item._id} item={item} />
            ))}
        </>
    );
};

export default ProductList;
