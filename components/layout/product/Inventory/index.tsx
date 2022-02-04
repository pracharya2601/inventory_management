import ComponentWrapper from '@/components/layout/ComponentWrapper';
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
import Pagination from '@/components/layout/product/Pagination';

const PAGE_LIMIT = 10;

const Inventory = ({ data, count }: { data: ProductType[]; count: number }) => {
    const [dataList, setDataList] = useState<any[] | []>(data);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [singleData, setSingleData] = useState<ProductType>(null);
    const router = useRouter();
    const businessId = router.query?.businessId as string;
    const productType = router.query?.productType;
    const pageNum = router.query?.page;
    const eventListern = `update.${businessId}-${productType}`;
    const addEventListener = `add.${businessId}-${productType}`;
    const {
        state: {
            user: { userdata },
            ui: { toggleOpen },
            lugItem,
        },
        dispatch,
    } = useContext(appContext);

    useEffect(() => {
        /**
         * @info useeffect to update realtime data
         */
        setDataList(data);
        if (businessId !== lugItem.businessId) {
            dispatch(
                action.removeItem({
                    index: 0,
                    stat: 'all',
                }),
            );
            dispatch(
                action.setBusinessId({
                    businessId: businessId,
                }),
            );
        }
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
            setDataList([]);
        };
    }, [router.asPath]);

    const business = userdata?.workplaces.find(({ workplaceId }) => workplaceId === router.query?.businessId);
    const onHandleSearchTerm = (e) => {
        const { value } = e.target;
        const cleanString = value.replace(/[|&;$%@"<>()+,]/g, '').toLowerCase();
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
                <ProductLayout
                    key={router.asPath}
                    pagination={count > PAGE_LIMIT && <Pagination count={count} limit={PAGE_LIMIT} />}
                >
                    <table className="min-w-full leading-normal">
                        <thead>
                            <TableHead />
                        </thead>
                        <tbody>
                            {dataList.length > 0 &&
                                dataList.map(
                                    (item: ProductType, index: number) =>
                                        item && (
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
                                        ),
                                )}
                        </tbody>
                    </table>
                </ProductLayout>
            </Dashboard>
        </ComponentWrapper>
    );
};

export default Inventory;

export const TableHead = () => (
    <tr>
        <th
            scope="col"
            className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Name
        </th>
        <th
            scope="col"
            className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Color
        </th>
        <th
            scope="col"
            className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Size
        </th>
        <th
            scope="col"
            className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Count
        </th>
        <th
            scope="col"
            className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Price
        </th>
        <th
            scope="col"
            className="px-4 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Detail
        </th>
        <th
            scope="col"
            className="px-3 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
        >
            Process
        </th>
    </tr>
);
