/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
import { useContext } from 'react';
import { usercontext } from '@context/user';
import DropdownSideBar from '../sidebar/DropdownSidebar';
import { SidebarItem } from '../sidebar/SidebarItem';
import { useRouter } from 'next/router';
import { productcontext } from '@context/data';

const Workplaces = () => {
    const { workplaces } = useContext(usercontext);
    const { productCatagoryList } = useContext(productcontext);
    const router = useRouter();

    const routeChange = (url: string) => {
        router.push(url);
    };
    return (
        <>
            {workplaces &&
                workplaces.map(({ positionLabel, workplaceId, workplaceName }) => (
                    <DropdownSideBar
                        label={workplaceName}
                        openStat={false}
                        key={workplaceId - workplaceName}
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
                        <SidebarItem
                            onClick={() => routeChange(`/dashboard/${workplaceId}/${positionLabel}/product/1`)}
                            label={workplaceName}
                        />
                    </DropdownSideBar>
                ))}
        </>
    );
};

export default Workplaces;
