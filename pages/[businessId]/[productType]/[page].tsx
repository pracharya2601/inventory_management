import { getSession } from 'next-auth/client';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { connectToDB } from 'db/connect';
import datas from 'db.json';
import { checkWorkplace } from 'db/workplace';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { appContext } from '@context/appcontext';
import Dashboard from '@/components/layout/company/Dashboard';
import BusinessNavbar from '@/components/layout/company/BusinessNavbar';
import { ProductType } from '@/interface/Product/ProductInterface';
import ProductLayout from '@/components/layout/product/ProductLayout';
import ProductRow from '@/components/layout/product/ProductRow';
import { action } from '@context/action';
import SearchBar from '@/components/layout/searchbar';
import SideboardOutline from '@/components/layout/sideboard/SideboardOutline';
import ProductPreview from '@/components/layout/product/ProductPreview';
import { socket } from 'socket/client';
import { getProductLists, getSearchProductList } from 'db/products';
import Pagination from '@/components/layout/product/Pagination';

const PAGE_LIMIT = 10;
//while changing this need to change on monog query also

const ProductList = ({ data, count }: { data: ProductType[] | []; count: number }) => {
    const [dataList, setDataList] = useState<ProductType[] | []>(data);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [singleData, setSingleData] = useState<ProductType>(null);
    const router = useRouter();
    const businessId = router.query?.businessId;
    const productType = router.query?.productType;
    const pageNum = router.query?.page;
    const eventListern = `update.${businessId}-${productType}`;
    const addEventListener = `add.${businessId}-${productType}`;
    const {
        state: {
            user: { userdata },
            ui: { toggleOpen },
            lugItem: {
                items
            }
        },
        dispatch,
    } = useContext(appContext);

    useEffect(() => {
        /**
         * @info useeffect to update realtime data
         */
        setDataList(data);
        socket.on(eventListern, (data: ProductType) => {
            const dataArr = [...dataList];
            const index = dataArr.findIndex(({ _id }) => _id === data._id);
            dataArr[index] = data;
            setDataList(dataArr);
            if (singleData?._id === data._id) {
                setSingleData(data);
            }
        });
        socket.on(addEventListener, (data: ProductType) => {
            setDataList((prevState) => [data, ...prevState]);
        });
        if (router.query?.search) {
            dispatch(
                action.toggleAction({
                    id: 'viewSearchBar',
                    open: true,
                }),
            );
            setSearchTerm(router.query?.search as string);
        }
        return () => {
            setSearchTerm('');
            setDataList([])
        };
    }, [router.asPath]);
    console.log(items);

    const business = userdata?.workplaces.find(({ workplaceId }) => workplaceId === router.query?.businessId);
    const onHandleSearchTerm = (e) => {
        const { value } = e.target;
        const cleanString = value.replace(/[|&;$%@"<>()+,]/g, "").toLowerCase();
        setSearchTerm(value);
        const filteredData: ProductType[] | [] = data.filter((data: ProductType) => {
            return data.name.toLowerCase().search(cleanString) != -1;
        });
        setDataList(filteredData);
    };
    const handleClear = () => {
        setSearchTerm('');
        setDataList(data);
        dispatch(
            action.toggleAction({
                id: 'viewSearchBar',
                open: false,
            }),
        );
        if (router.query?.search) {
            router.push(`/${router.query?.businessId}/${router.query?.productType}/1`);
        }
    };
    return (
        <ComponentWrapper
            searchBarComponent={
                <SearchBar searchTerm={searchTerm} onChange={onHandleSearchTerm} handleClear={handleClear} />
            }
            productPreview={
                <SideboardOutline
                    open={toggleOpen?.['previewProduct']}
                    setOpen={() => {
                        dispatch(
                            action.toggleAction({
                                id: 'previewProduct',
                                open: false,
                            }),
                        );
                        setSingleData(null);
                    }}
                    noOutsideClick={true}
                    size="full"
                    label={<div className="pt-1">{singleData?.name || 'Previewing Item'}</div>}
                >
                    {singleData && (
                        <ProductPreview
                            key={`${new Date().toDateString}`}
                            data={singleData}
                            staffPosition={business.positionLabel}
                        />
                    )}
                </SideboardOutline>
            }
        >
            <Dashboard
                businessHeading={
                    <BusinessNavbar
                        name={business?.workplaceName}
                        id={business?.workplaceId}
                        position={business?.positionLabel}
                    />
                }
            >
                {router.query?.productType === 'inventory' || router.query?.productType === 'stock' ? (
                    <ProductLayout key={router.asPath}
                        pagination={count > PAGE_LIMIT && <Pagination count={count} limit={PAGE_LIMIT} />}
                    >
                        {dataList.length > 0 && dataList.map((item: ProductType, index) => (
                            <ProductRow
                                key={`${item._id}-${index}`}
                                item={item}
                                onView={() => {
                                    setSingleData(item);
                                    dispatch(
                                        action.toggleAction({
                                            id: 'previewProduct',
                                            open: true,
                                        }),
                                    );
                                }}
                            />
                        ))}
                    </ProductLayout>
                ) : (
                    <ProductLayout></ProductLayout>
                )}
            </Dashboard>
        </ComponentWrapper>
    );
};

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session || !session.user) {
        return {
            redirect: {
                permanent: false,
                destination: `/signin?callbackUrl=${context.resolvedUrl}`,
            },
        };
    }
    const { db } = await connectToDB();
    const businessId = context.query.businessId;
    const productType = context.query.productType;
    const pageNumber = context.query.page as string;
    const skipNumber = pageNumber === '1' ? 0 : +pageNumber - 1 * PAGE_LIMIT;
    const searchTerm = context.query.search as string;
    const userId = session.user.id;
    const isUserRelatedtoCompany = await checkWorkplace(db, userId, businessId);
    if (!isUserRelatedtoCompany) {
        return {
            redirect: {
                permanent: false,
                destination: `/`,
            },
        };
    }
    let count = 0;
    let itemlist = [];
    if (searchTerm) {
        const { data, totalCount } = await getSearchProductList(db, businessId, productType, skipNumber, searchTerm)
        if (totalCount > 0) {
            itemlist = JSON.parse(JSON.stringify(data));
            count = totalCount;
        }
    } else {
        const { data, totalCount } = await getProductLists(db, businessId, productType, skipNumber)
        if (totalCount > 0) {
            itemlist = JSON.parse(JSON.stringify(data));
            count = totalCount;
        }
    }
    return {
        props: {
            data: itemlist,
            count: count,
        },
    };
}
export default ProductList;
