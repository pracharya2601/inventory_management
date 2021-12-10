import { getSession } from 'next-auth/client';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { getOneWorkPlace } from 'db/workplace';
import { connectToDB } from 'db/connect';
import { useRouter } from 'next/router';
import Dashboard from '@/components/layout/company/Dashboard';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '@context/appcontext';
import { CompanyTypes } from '@/interface/Workplace/Company';
import BusinessNavbar from '@/components/layout/company/BusinessNavbar';

const CompanyDashboard = ({ companydata }: { companydata: CompanyTypes }) => {
    const [companyData, setCompanyData] = useState<CompanyTypes | null>(companydata);
    const router = useRouter();
    const {
        state: {
            user: { userdata },
        },
    } = useContext(appContext);
    useEffect(() => {
        /**
         * @info useeffect is for socket and to update on realtime
         */

        return () => {
            setCompanyData(null);
        };
    }, []);
    const business = userdata?.workplaces.find(({ workplaceId }) => workplaceId === router.query?.businessId);
    console.log(companyData);
    return (
        <ComponentWrapper>
            <Dashboard
                businessHeading={
                    <BusinessNavbar
                        name={business?.workplaceName}
                        id={business?.workplaceId}
                        position={business?.positionLabel}
                    />
                }
            >
                <div>This is Company Dashboard {companyData.workplaceName}</div>
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
    const businessId = context.query.businessId;
    const userId = session.user.id;
    const { db } = await connectToDB();
    const companyData = await getOneWorkPlace(db, businessId as string, userId);
    if (!companyData) {
        return {
            redirect: {
                permanent: false,
                destination: `/`,
            },
        };
    }
    const companydata = JSON.parse(JSON.stringify(companyData));
    return {
        props: {
            companydata,
        },
    };
}
export default CompanyDashboard;
