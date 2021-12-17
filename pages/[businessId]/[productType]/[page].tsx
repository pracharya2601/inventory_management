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

const ProductList = ({ data }: { data: ProductType[] | [] }) => {
    const [dataList, setDataList] = useState<ProductType[] | []>(data);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [singleData, setSingleData] = useState<ProductType>(null);
    const router = useRouter();
    const businessId = router.query?.businessId;
    const productType = router.query?.productType;
    const eventListern = `update.${businessId}-${productType}`;
    const addEventListener = `add.${businessId}-${productType}`;
    const {
        state: {
            user: { userdata },
            ui: { toggleOpen },
        },
        dispatch,
    } = useContext(appContext);

    useEffect(() => {
        /**
         * @info useeffect to update realtime data
         */
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
            setSearchTerm(searchTerm);
        }
        return () => {
            setSearchTerm('');
        };
    }, [router.asPath]);

    const business = userdata?.workplaces.find(({ workplaceId }) => workplaceId === router.query?.businessId);
    const onHandleSearchTerm = (e) => {
        const { value } = e.target;
        const searchValue = value.toLowerCase();
        setSearchTerm(value);
        const filteredData: ProductType[] | [] = data.filter((data: ProductType) => {
            return data.name.toLowerCase().search(searchValue) != -1;
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
                    <ProductLayout key={router.asPath}>
                        {dataList.map((item: ProductType, index) => (
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
    const pageNumber = context.query.page;
    const userId = session.user.id;
    const isUserRelatedtoCompany = await checkWorkplace(db, session.user.id, businessId);

    if (!isUserRelatedtoCompany) {
        return {
            redirect: {
                permanent: false,
                destination: `/`,
            },
        };
    }
    return {
        props: {
            data: [datas[3], datas[5], datas[5]],
        },
    };
}
export default ProductList;
