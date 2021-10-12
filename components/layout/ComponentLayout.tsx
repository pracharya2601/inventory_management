import { useState, useRef } from "react";
import Link from 'next/link'
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { signOut } from 'next-auth/client';
import { useRouter } from "next/dist/client/router";

export interface ComponentLayoutProps {
  authenticated?: boolean;
  sidebarItems?: JSX.Element;
  sidebarItemsBottom?: JSX.Element;
  children?: JSX.Element;
}

export interface SidebarItemProps {
  markIcon?: boolean;
  label?: string | JSX.Element;
  icon?: JSX.Element;
  onClick?: () => void;
}

const ComponentLayout = ({ children, authenticated, sidebarItems, sidebarItemsBottom }: ComponentLayoutProps) => {
  const sidebarRef = useRef(null);
  const [open, setOpen] = useState(false);
  const router = useRouter()
  useOutsideClick(sidebarRef, setOpen);
  return (
    <div className="dark relative min-h-screen">
      <div className="bg-gray-300 z-20 pr-2 dark:bg-gray-800 text-black border-b dark:text-gray-100 flex justify-between w-screen absolute" onClick={(e) => e.stopPropagation()}>
        <button className="mobile-menu-button p-2 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-700" onClick={() => setOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/">
          <a href="" className="text-gray-800 dark:text-white flex items-center space-x-2 px-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
            <span className="text-lg font-extrabold">Inventory</span>
          </a>
        </Link>
        {!authenticated && <button className="mobile-menu-button text-blue-500 font-bold uppercase hover:text-blue-700 p-2 px-3 focus:outline-none focus:bg-gray-700 ml-auto text-xs items-center flex" onClick={() => setOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Login
        </button>
        }
        {authenticated && <button className="mobile-menu-button font-bold uppercase text-red-500 hover:text-red-700 p-2 px-3 text-xs items-center focus:outline-none focus:bg-gray-700 ml-auto flex " onClick={() => signOut()}>

          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>}
      </div>


      <div className={`${!open && '-translate-x-full'} flex flex-col z-40 bg-gray-300 dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out`} ref={sidebarRef}>
        {/* <div className={`${!open && '-translate-x-full'} z-10 bg-gray-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition duration-200 ease-in-out`} ref={sidebarRef}> */}
        <button className={`bg-${open ? "red" : "blue"}-900 text-white p-2 rounded-r absolute bottom-0 right-0 mb-10 -mr-9 `} onClick={() => setOpen(!open)}>
          {open ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
          </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>

          }
        </button>
        {open && <button className="mobile-menu-button p-2 focus:outline-none text-white focus:bg-gray-600 absolute top-0 right-0 -mr-10 bg-gray-700 rounded-r" onClick={() => setOpen(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>}

        <Link href="/">
          <a href="" className="flex items-center space-x-2 px-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
            <span className="text-2xl font-extrabold">Inventory</span>
          </a>
        </Link>

        <nav className="flex-1 flex flex-col justify-between h-full overflow-x-visible overflow-y-auto">
          <span className="pb-1">
            <SidebarItem onClick={() => router.push('/')} label="Home Page"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>}
            />
            <SidebarItem onClick={() => router.push('/dashboard')} label="Dashboard" icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            } />
            {sidebarItems}
          </span>
          <span className="gap-2 border-t-2 pt-1">
            {sidebarItemsBottom}
          </span>
        </nav>
      </div>

      <div className="flex-1 dark:bg-gray-900 dark:text-white h-screen overflow-auto">
        {children}
      </div>

    </div>
  )
}

export default ComponentLayout;

export const SidebarItem = ({ label, icon, markIcon, onClick }: SidebarItemProps) => {
  const router = useRouter()
  // const onClickHandle = () => {
  //   if (onClick) {
  //     onClick();
  //   }
  // }
  return (
    <div
      className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 dark:hover:bg-black flex justify-between cursor-pointer"
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        {icon && icon}
        {label}
      </span>
      {markIcon && (<span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </span>)}
    </div>
  )
}

export const DropdownSideBar = ({ children, label }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b-2 border-t-2">
      <a onClick={() => setOpen(!open)} className="block py-2.5 px-4 rounded transition duration-200 bg-gray-200  dark:bg-gray-900 flex justify-between cursor-pointer"
      >
        {label}
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${open && 'transform rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </a>
      <span className={`${!open && "hidden"}`}>
        {children}
      </span>

    </div>
  )
}