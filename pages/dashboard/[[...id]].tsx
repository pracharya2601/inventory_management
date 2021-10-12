import type { NextPage } from 'next'
import Head from 'next/head'
import { getSession } from 'next-auth/client';
import { Session } from 'next-auth';
import { getUserById } from 'db/user';
import { connectToDB } from 'db/connect';
import { useRouter } from 'next/dist/client/router';
import ComponentLayout, { DropdownSideBar, SidebarItem } from '@/components/layout/ComponentLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BusinessHeader from '@/components/layout/BusinessHeader';
import { getOneWorkPlace } from 'db/workplace';
import { StaffType } from '@/interface/Workplace/StaffType';
import datas from '../../db.json';
import { ProductType } from '@/interface/Product/ProductInterface';
import ProductRow from '@/components/layout/product/ProductRow';
import { datacontext } from "@context/data/datacontext";
import { useContext, useState } from 'react';
import Pagination from '@/components/layout/Pagination';
import { useDashboard } from '@/hooks/useDashboard';
import ProductList from '@/components/layout/product/ProductList';

interface Props {
  productList: any;
  company: any;
  authenticated: boolean;
  workplaces: any;
  user: any;
}

const Dashboard = ({ productList, company, authenticated, workplaces, user }: Props) => {
  const router = useRouter()
  //const { position, isDataFetched, page, companyId, dataType, routeChange } = useDashboard()
  const [companyDetail, setCompany] = useState(company);


  const id = router.query.id as string[];
  const companyId = id && id[0];
  const position = id && id[1];
  const dataType = id && id[2];
  const page = id && id[3] || 1;
  const isDataFetched = companyId && position && dataType && page;

  const routeChange = (url: string) => {
    router.push(url)
  }
  console.log(company)

  const renderData = isDataFetched && (
    <DashboardLayout
      businessHeading={
        <BusinessHeader
          position={position}
          company={company}
        />
      }
      businessData={<ProductList key={page} productList={productList} />}
      pagination={
        <Pagination active={page} routeChange={routeChange} workplaceId={companyId} positionLabel={position} />
      }
    >
    </DashboardLayout>
  )

  return (
    <ComponentLayout
      authenticated={authenticated}
      sidebarItems={
        <>
          <DropdownSideBar label="Work Places">
            {workplaces && workplaces.map(({ positionLabel, workplaceId, workplaceName }) => (
              <SidebarItem key={workplaceId - workplaceName} onClick={() => routeChange(`/dashboard/${workplaceId}/${positionLabel}/product/1`)} label={workplaceName} />
            ))}
            <SidebarItem onClick={() => router.push("/dashboard/newitem")} label="New Places" />
          </DropdownSideBar>
          <SidebarItem onClick={() => router.push("/dashboard/newitem")} label="New Places" />
        </>
      }
      sidebarItemsBottom={
        <>
          <SidebarItem onClick={() => router.push("/dashboard/newitem")} label="Account" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>} />
          <SidebarItem onClick={() => router.push("/dashboard/newitem")} label="Setting" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>} />
          <SidebarItem onClick={() => router.push("/dashboard/newitem")} label="Privacy Policy" icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          } />
        </>
      }
    >
      {renderData}
    </ComponentLayout>
  )
}

export async function getServerSideProps(context) {
  const session: Session = await getSession(context);
  if (!session || !session.user) {
    return {
      redirect: {
        permanent: false,
        destination: `/signin?callbackUrl=/dashboard`
      }
    }
  }
  const { db } = await connectToDB()
  const user = JSON.parse(await getUserById(db, session.user.id));
  const workplaces = user.workplaces || null;
  let productList = [];
  let company = null;
  if (context.query.id) {
    const userId = session.user.id;
    const workPlaceId = context.query.id[0];
    const staffPosition = context.query.id[1];
    const productType = context.query.id[2];
    const page = parseInt(context.query.id[3]);
    const compdata = JSON.parse(await getOneWorkPlace(db, workPlaceId, staffPosition, userId));
    company = compdata ? compdata[0] : null;
    productList = [datas[page]];
  }
  console.log(productList)
  return {
    props: {
      authenticated: session.user ? true : false,
      user: session.user,
      workplaces: workplaces ? workplaces : null,
      productList,
      company,
    }
  }

}

export default Dashboard;