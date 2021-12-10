import ColorVariant from '../../company/Variant/ColorVariant';
import SizeVariant from '../../company/Variant/SizeVariant';
import SideBoard from '../../sideboard';

export const SkusTable = ({
    children,
    addNewButton,
}: {
    children?: JSX.Element | JSX.Element[];
    addNewButton?: JSX.Element;
    tableHead?: JSX.Element;
}) => {
    return (
        <div className="overflow-x-auto pb-60">
            <div className="inline-block min-w-full bg-gray-600 overflow-y-visible">
                <table className="min-w-full leading-normal">
                    <THead />
                    <tbody>{children}</tbody>
                </table>
            </div>
            {addNewButton}
        </div>
    );
};
export const SkusTableBodyHolder = ({ children }: { children?: JSX.Element | JSX.Element[] }) => (
    <tr className="relative">{children}</tr>
);

export const SkusTableWrapper = ({ children, last }: { children: JSX.Element; last?: boolean }) => {
    return (
        <td className={`px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm ${last && 'w-0 relative'}`}>
            {children}
        </td>
    );
};

export const THead = () => (
    <thead>
        <tr>
            <th
                scope="col"
                className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
            >
                <div className="flex gap-4">
                    Color
                    <SideBoard
                        size="small"
                        label={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                    >
                        <ColorVariant />
                    </SideBoard>
                </div>
            </th>
            <th
                scope="col"
                className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
            >
                <div className="flex gap-4">
                    Size
                    <SideBoard
                        size="small"
                        label={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        }
                    >
                        <SizeVariant />
                    </SideBoard>
                </div>
            </th>
            <th
                scope="col"
                className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
            >
                Count
            </th>
            <th
                scope="col"
                className="px-5 py-3  border-b border-gray-700 dark:border-gray-200  text-left text-sm uppercase font-semibold"
            >
                Price
            </th>
        </tr>
    </thead>
);
