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
import Staffs from '@/components/layout/company/Staffs';
import CreateEmployee from '@/components/layout/company/Staffs/CreateEmployee';
import Button from '@/components/elements/Button';

const CompanyDashboard = ({ companydata }: { companydata: CompanyTypes }) => {
    const [companyData, setCompanyData] = useState<CompanyTypes | null>(companydata);
    const router = useRouter();
    const {
        state: {
            user: { userdata },
            workplace: { productCatagory }
        },
    } = useContext(appContext);
    const companyId = router.query?.businessId;
    const addEmployee = `create-employee-${companyId}`;
    const verifyEvent = `staffverify-${companyId}`;
    const deleteEmployee = `delete-employee-${companyId}`
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
        socket.on(deleteEmployee, (data: string) => {
            const newArr: EmployeeType[] | [] = [...companydata.staffs];
            const rowIndex = newArr.findIndex((item: EmployeeType) => item.email === data || item.userId === data);
            newArr.splice(rowIndex, 1);
            setCompanyData((prevState) => ({
                ...prevState,
                staffs: newArr,
            }));
        });
        return () => {
            socket.disconnect();
        };
    }, []);
    const business = userdata?.workplaces.find(({ workplaceId }) => workplaceId === companyId);
    const routeChange = (url: string) => {
        router.push(url);
    }
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
                <>
                    <div>
                        Need to work on: <br />
                        Other stuff like graph visulation<br />
                        Total number of sale <br />
                        Low level product warning notification <br />
                    </div>
                    <div className='hidden md:block'>
                        <div className='flex flex-wrap gap-2 justify-center sm:justify-start mt-3'>
                            <div key={`companydashboard-createitem`} className='flex justify-center items-center rounded py-2 px-2 w-full sm:w-max'>
                                <Button label="Add Item" customClass='w-full sm:w-40 h-20 sm:h-40' size='lg' color="purple" onClick={() => routeChange(`/${companyId}/create`)} />
                            </div>
                            {productCatagory.map((item) => (
                                <div key={`companydashboard-${item.id}`} className='flex justify-center items-center rounded py-2 px-2 w-full sm:w-max'>
                                    <Button label={item.label} customClass='w-full sm:w-40 h-20 sm:h-40' size='lg' color="purple" onClick={() => routeChange(`/${companyId}/${item.id}/1`)} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-5 grid grap-cols-1 sm:grid-cols-4 lg:grid-cols-3 content-start pb-20">
                        <div className="col-span-1 sm:col-span-2 lg:col-span-1 shadow-lg px-2">
                            <div className="max-w-md">
                                <div className=" text-lg px-2 mt-2">Employee List</div>
                                <p className="text-yellow-500 text-xs mb-8 px-2">List of all Employee</p>
                                <Staffs
                                    staffs={companyData?.staffs}
                                    pos={business?.positionLabel}
                                    key={`staffs-length-${companyData?.staffs.length}`}
                                    secret={business?.secret}
                                />
                            </div>
                        </div>
                        <div className="col-span-1 sm:col-span-2 lg:col-span-1 shadow-lg px-4 h-96">
                            <CreateEmployee secret={business?.secret} />
                        </div>
                    </div>
                </>
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
    const businessId = context.query.businessId as string;
    const userId = session.user.id as string;
    const { db } = await connectToDB();
    const companyData = await getOneWorkPlace(db, businessId, userId);
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
