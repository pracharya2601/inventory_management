import { ProductType } from '@/interface/Product/ProductInterface';
import React, { useContext } from 'react';
import ProductRow from './ProductRow';
import { appContext } from '@context/appcontext';

const ProductList = () => {
    const {
        state: {
            workplace: {
                productList: { data },
            },
        },
    } = useContext(appContext);

    // const { setOpen } = useOpen();
    // const viewItem = (item) => {
    //     setViewingItem(item);
    //     setOpen(true);
    // };

    return (
        <>
            {data.map((item: ProductType) => (
                <ProductRow key={item._id} item={item} />
            ))}
        </>
    );
};

export default ProductList;
