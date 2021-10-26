import { ProductType } from '@/interface/Product/ProductInterface';
import React, { useContext } from 'react';
import ProductRow from './ProductRow';
import { productcontext } from '@context/data';
import { useOpen } from '@/hooks/useOpen';

const ProductList = () => {
    const { productList, setViewingItem } = useContext(productcontext);
    const { setOpen } = useOpen();
    const viewItem = (item) => {
        setViewingItem(item);
        setOpen(true);
    };

    return (
        <>
            {productList.map((item: ProductType) => (
                <ProductRow key={item._id} item={item} viewItem={() => viewItem(item)} />
            ))}
        </>
    );
};

export default ProductList;
