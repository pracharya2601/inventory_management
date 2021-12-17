import { getSession } from 'next-auth/client';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { getOneWorkPlace } from 'db/workplace';
import { connectToDB } from 'db/connect';
import { useRouter } from 'next/router';
import Dashboard from '@/components/layout/company/Dashboard';
import { useContext, useEffect, useState } from 'react';
import { appContext } from '@context/appcontext';
import { CompanyTypes, EmployeeType, VerifiedDataPayloadType } from '@/interface/Workplace/Company';
import BusinessNavbar from '@/components/layout/company/BusinessNavbar';
import { socket } from 'socket/client';
import SideBoard from '@/components/layout/sideboard';
import Staffs from '@/components/layout/company/Staffs';
import CreateEmployee from '@/components/layout/company/Staffs/CreateEmployee';

const CompanyDashboard = ({ companydata }: { companydata: CompanyTypes }) => {
    const [companyData, setCompanyData] = useState<CompanyTypes | null>(companydata);
    const router = useRouter();
    const {
        state: {
            user: { userdata },
        },
    } = useContext(appContext);
    const evnetI = router.query?.businessId;
    const addEmployee = `create-employee-${evnetI}`;
    const verifyEvent = `staffverify-${evnetI}`;
    useEffect(() => {
        /**
         * @info useeffect is for socket and to update on realtime
         */
        socket.on(`${router.query?.businessId}`, (data: CompanyTypes) => {
            setCompanyData(data);
        });
        socket.on(verifyEvent, (data: VerifiedDataPayloadType) => {
            const arrStaff: EmployeeType[] | [] = [...companydata.staffs];
            const rowIndex = arrStaff.findIndex((item: EmployeeType) => item.email === data.email);
            arrStaff[rowIndex] = {
                ...arrStaff[rowIndex],
                ...data,
            };
            setCompanyData((prevState) => ({
                ...prevState,
                staffs: arrStaff,
            }));
        });
        socket.on(addEmployee, (data: EmployeeType[]) => {
            const newArr: EmployeeType[] | [] = [...companydata.staffs, ...data];
            console.log(data, newArr);
            setCompanyData((prevState) => ({
                ...prevState,
                staffs: newArr,
            }));
        });
        return () => {
            socket.disconnect();
        };
    }, []);
    const business = userdata?.workplaces.find(({ workplaceId }) => workplaceId === router.query?.businessId);
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
                <div className="mt-5 grid grap-cols-1 sm:grid-cols-4 lg:grid-cols-3 content-start pb-20">
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1 shadow-lg px-2">
                        <div className="max-w-md">
                            <div className=" text-lg px-2 mt-2">Employee List</div>
                            <p className="text-yellow-500 text-xs mb-8 px-2">List of all Employee</p>
                            <Staffs
                                staffs={companyData?.staffs}
                                pos={business?.positionLabel}
                                key={`staffs-length-${companyData?.staffs.length}`}
                            />
                        </div>
                    </div>
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1 shadow-lg px-4 h-96">
                        <CreateEmployee />
                    </div>
                </div>
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
