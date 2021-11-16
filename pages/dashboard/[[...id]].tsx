/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { ssrPipe } from 'ssr/ssrPipe';
import { withSession } from 'ssr/withSession';
import { connectDb } from 'ssr/connectDb';
import { withUser } from 'ssr/withUser';
import { getProduct } from 'ssr/getProduct';
import { useFirstRender } from '@/hooks/useFirstRender';
import { action } from '@context/action';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import BusinessInfo from '@/components/layout/company/BusinessInfo';
import { BusinessStaffPosition, CompanyNav } from '@/components/layout/company/CompanyHeading';
import Dashboard from '@/components/layout/company/Dashboard';
import { appContext } from '@context/appcontext';
import { TableHead } from '@/components/layout/DashboardLayout';
import { ProductType } from '@/interface/Product/ProductInterface';
import ProductRow from '@/components/layout/product/ProductRow';
import CreatenewLayout from '@/components/layout/createnewLayout';
import ProductLayout from '@/components/layout/product/ProductLayout';
interface Props {
    productList: any;
    company: any;
    authenticated: boolean;
    workplaces: any;
    user: any;
    productCatagory: any[];
}

const DashboardPage = ({ authenticated, workplaces, user, company, productList, productCatagory }: Props) => {
    const {
        state: {
            workplace: {
                productList: { data, dataType },
            },
            route: { renderingPage },
        },
    } = useContext(appContext);

    useFirstRender(
        action.checkAuthenticated({ authenticated }),
        action.getUser({ userdata: user }),
        action.getUserWorkplaces({ workplaces }),
        action.getCompanyData({ companydata: company }),
        action.getProduct(productList),
        action.getProductCatagory({ productCatagory }),
    );

    const renderdata =
        renderingPage === 'productlist' ? (
            <Dashboard
                businessHeading={<BusinessInfo companyNav={<CompanyNav />} staffPosition={<BusinessStaffPosition />} />}
            >
                <ProductLayout>
                    {data.map((item: ProductType) => (
                        <ProductRow key={item._id} item={item} />
                    ))}
                </ProductLayout>
            </Dashboard>
        ) : (
            <Dashboard>
                <CreatenewLayout />
            </Dashboard>
        );

    return <ComponentWrapper>{renderdata}</ComponentWrapper>;
};
export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser, getProduct);

export default DashboardPage;
