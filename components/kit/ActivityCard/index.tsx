import React from 'react';

const ActivityCard = () => {
  return (
    <div className="shadow-lg rounded-xl w-full md:w-80 p-4 bg-white dark:bg-gray-800 relative overflow-hidden">
      <div className="w-full flex items-center justify-between mb-8">
        <p className="text-gray-800 dark:text-white text-xl font-normal">Activity</p>
        <a
          href="#"
          className="flex items-center text-sm hover:text-gray-600 dark:text-gray-50 dark:hover:text-white text-gray-300 border-0 focus:outline-none"
        >
          VIEW ALL
        </a>
      </div>
      <div className="flex items-start mb-6 pr-5 overflow-hidden rounded justify-between">
        <span className="rounded-full text-white dark:text-gray-800 p-2 bg-yellow-300">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-128-448v320h-1024v-192l192-192 128 128 384-384zm-832-192q-80 0-136-56t-56-136 56-136 136-56 136 56 56 136-56 136-136 56z" />
          </svg>
        </span>

        <div className="flex items-center w-full justify-between">
          <div className="flex text-sm flex-col ml-2 items-start justify-between">
            <p className="text-gray-700 dark:text-white leading-4 h-8 overflow-hidden">
              <span className="font-bold mr-1">Andrea &nbsp;</span> uploaded 3 documents on concept deisgn
              home page uploaded 3 documents on concept deisgn
              home page home page uploaded 3 documents on concept deisgn
              home page
            </p>
            <p className="text-gray-300">Aug 10</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActivityCard;