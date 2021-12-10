/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import DropdownSideBar from '../sidebar/DropdownSidebar';
import { SidebarItem } from '../sidebar/SidebarItem';
import { useRouter } from 'next/router';
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
                    label={` ${workplaceName}`}
                    openStat={workplaces?.length > 1 ? false : true}
                    key={`${workplaceId}-${workplaceName}`}
                    sideborder={true}
                >
                    <SidebarItem
                        onClick={() => routeChange(`/${workplaceId}`)}
                        label="Dashboard"
                        markIcon={router.asPath === `/${workplaceId}` ? true : false}
                    />
                    <SidebarItem
                        onClick={() => routeChange(`/${workplaceId}/create`)}
                        label="Add New Product"
                        markIcon={router.asPath === `/${workplaceId}/create` ? true : false}
                    />
                    <>
                        {productCatagory.map(({ label, id }) => (
                            <SidebarItem
                                key={id}
                                onClick={() => routeChange(`/${workplaceId}/${id}/1`)}
                                markIcon={
                                    router.asPath === `/${workplaceId}/${id}/${router.query?.page}` ? true : false
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
