import { action } from '@context/action';
import { appContext } from '@context/appcontext';
import { useContext } from 'react';
import SearchBar from '../searchbar';
import { SearchIcon } from './CompanyHeading';

interface BusinessHeaderInfoProps {
    companyNav?: JSX.Element;
    staffPosition?: JSX.Element;
}

const BusinessInfo = ({ companyNav, staffPosition }: BusinessHeaderInfoProps) => {
    const {
        dispatch,
        state: {
            route: { pathName },
        },
    } = useContext(appContext);

    const openSearchBarHandle = () => {
        dispatch(
            action.toggleAction({
                id: 'viewSearchBar',
                open: true,
            }),
        );
    };
    return (
        <div className="bg-gray-300 dark:bg-gray-800 sticky top-0 z-30 h-12 mt-1 flex justify-between border-b items-center px-2">
            {companyNav}
            {pathName?.id?.length > 3 && <SearchIcon onClick={openSearchBarHandle} />}
            {staffPosition}
        </div>
    );
};

export default BusinessInfo;
