interface BusinessHeaderInfoProps {
    companyNav?: JSX.Element;
    searchBar?: JSX.Element;
    staffPosition?: JSX.Element;
}

const BusinessInfo = ({ companyNav, searchBar, staffPosition }: BusinessHeaderInfoProps) => {
    return (
        <div className="bg-gray-300 dark:bg-gray-800 sticky top-0 z-30 h-12 mt-1 flex justify-between border-b items-center px-2">
            {companyNav}
            {searchBar && searchBar}
            {staffPosition}
        </div>
    );
};

export default BusinessInfo;
