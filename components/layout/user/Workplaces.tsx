/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import { useContext } from 'react';
import { usercontext } from '@context/user';
import DropdownSideBar from '../sidebar/DropdownSidebar';
import { SidebarItem } from '../sidebar/SidebarItem';
import { useRouter } from 'next/router';
import { productcontext } from '@context/data';
import { appContext } from '@context/appcontext';
import { WorkplaceTypes } from '@/interface/Workplace/WorkplaceListTypes';
import { ProductCatagory } from '@/interface/Workplace/Company';

type Props = {
    workplaces: WorkplaceTypes[];
    productCatagory: ProductCatagory[];
    setOpen?: (stat: boolean) => void;
};

const Workplaces = ({ workplaces, productCatagory, setOpen }: Props) => {
    const router = useRouter();

    const routeChange = (url: string) => {
        router.push(url);
        setOpen(false);
    };
    return (
        <>
            {workplaces.map(({ positionLabel, workplaceId, workplaceName }) => (
                <DropdownSideBar
                    label={workplaceName}
                    openStat={false}
                    key={workplaceId + workplaceName}
                    sideborder={true}
                >
                    <SidebarItem
                        onClick={() => routeChange(`/dashboard/${workplaceId}`)}
                        label="Dashboard"
                        markIcon={router.asPath === `/dashboard/${workplaceId}` ? true : false}
                    />
                    <SidebarItem
                        onClick={() => routeChange(`/createnew/${workplaceId}`)}
                        label="Add New"
                        markIcon={router.asPath === `/createnew/${workplaceId}` ? true : false}
                    />
                    <>
                        {productCatagory.map(({ label, id }) => (
                            <SidebarItem
                                key={id}
                                onClick={() => routeChange(`/dashboard/${workplaceId}/${positionLabel}/${id}/1`)}
                                markIcon={
                                    router.asPath === `/dashboard/${workplaceId}/${positionLabel}/${id}/1`
                                        ? true
                                        : false
                                }
                                label={label}
                            />
                        ))}
                    </>
                </DropdownSideBar>
            ))}
        </>
    );
};

export default Workplaces;
