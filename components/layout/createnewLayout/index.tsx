import Button from '@/components/elements/Button';
import { appContext } from '@context/appcontext';
import router from 'next/router';
import React, { useContext } from 'react';

const CreatenewLayout = () => {
    const {
        state: {
            user: { workplaces },
        },
    } = useContext(appContext);
    return (
        <div className="mt-20">
            {workplaces.map(({ workplaceId, workplaceName, joinedDate, positionLabel }, index) => (
                <div
                    key={workplaceId + positionLabel}
                    className={`p-2 py-10 md:px-10 justify-center md:justify-start flex gap-4 flex-wrap items-center flex-1 mx-3 mt-10 mb-10 border rounded relative 
                    bg-gray-${index % 2 == 0 ? '800' : '900'}`}
                >
                    <div
                        className="absolute -top-5 h-10 left-10 border px-3 py-2 rounded dark:bg-gray-900 flex gap-2 cursor-pointer "
                        onClick={() => router.push(`/dashboard/${workplaceId}`)}
                    >
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                            </svg>
                        </span>
                        <span className="w-48 md:w-full max-w-md truncate">{workplaceName}</span>
                    </div>
                    <div className="flex flex-col justify-center items-center p-10 h-36 w-36 bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900 dark:bg-gray-800 ring-2 ring-offset -1 rounded">
                        <p className="mb-2">Go to Dashboard</p>
                        <Button
                            label="Go Now"
                            color="indigo"
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                </svg>
                            }
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center p-10 h-36 w-36 bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900 dark:bg-gray-800 ring-2 rounded">
                        <p className="mb-2">Add New Inventory</p>
                        <Button
                            label="Add"
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            }
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center p-10 h-36 w-36 bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900 dark:bg-gray-800 ring-2 ring-offset -1 rounded">
                        <p className="mb-2">Add New Employee</p>
                        <Button
                            label="Add"
                            color="green"
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                            }
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center p-10 h-36 w-36 bg-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900 dark:bg-gray-800 ring-2 ring-offset -1 rounded">
                        <p className="mb-2">Update Workplace</p>
                        <Button
                            label="Update"
                            color="purple"
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                </svg>
                            }
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CreatenewLayout;
