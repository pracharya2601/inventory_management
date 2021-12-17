import DropDownMenu, { DropDownItem } from '@/components/elements/ddm/DropDownMenu';
import Input from '@/components/elements/Input';
import { EmployeeType } from '@/interface/Workplace/Company';
import { useState } from 'react';

const Staffs = ({ staffs, pos }: { staffs: EmployeeType[]; pos: string }) => {
    const [state, setState] = useState<EmployeeType[]>(staffs);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const onHandleChange = (e) => {
        setSearchTerm(e.target.value);
        const searchValue = e.target.value.toLowerCase();
        const filteredData = staffs.filter((data) => {
            return data.fullName.toLowerCase().search(searchValue) != -1;
        });
        setState(filteredData);
    };
    const onClear = () => {
        setSearchTerm('');
        setState(staffs);
    };
    return (
        <div className="px-2">
            <div className="py-2 mb-2 -mt-5 md:max-w-sm">
                <Input
                    value={searchTerm}
                    onChange={onHandleChange}
                    placeholder="Search Employee"
                    square
                    onClear={() => onClear()}
                />
            </div>
            {state?.map((employee, index) => (
                <div
                    key={`${employee.joinedDate}-${index}`}
                    className={`border py-2 pb-3 pl-4 pr-2 mb-2 rounded md:max-w-sm ${
                        employee.joined ? 'bg-gray-900' : 'bg-gray-700'
                    } ${employee.positionLabel === 'admin' && 'order-first'}`}
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="mr-1">&#128100;</span>
                            {employee.fullName}
                        </div>
                        <div className="ml-auto">
                            {employee.positionLabel === 'admin' && <span className="ml-auto mr-2">&#128313;</span>}
                            {employee.joined ? (
                                <span className="ml-auto mr-2">&#10004;</span>
                            ) : (
                                <span className="ml-auto mr-2">&#10071;</span>
                            )}
                        </div>
                        {pos === 'admin' && (
                            <DropDownMenu
                                label={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 rounded w-6 cursor-pointer hover:bg-gray-800"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                        />
                                    </svg>
                                }
                            >
                                <DropDownItem label="Remove " onClick={() => alert('hello')} />
                            </DropDownMenu>
                        )}
                    </div>
                    <div>
                        <span className="mr-1">&#9993;</span>
                        {employee.email}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Staffs;
