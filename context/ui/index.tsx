/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const uicontext = createContext({
    searchBar: false,
    searchTerm: '',
    accountSidebar: false,
    setSearchTerm: (term: string) => {},
    setSearchBar: (type: boolean) => {},
    setAccountSidebar: (stat: boolean) => {},
});

const UiProvider = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const [searchBar, setSearchBar] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [accountSidebar, setAccountSidebar] = useState<boolean>(false);

    useEffect(() => {
        if (router.query.search) {
            setSearchTerm(router.query.search as string);
            setSearchBar(true);
        }
    }, []);

    return (
        <uicontext.Provider
            value={{ searchBar, searchTerm, accountSidebar, setSearchBar, setSearchTerm, setAccountSidebar }}
        >
            {children}
        </uicontext.Provider>
    );
};

export default UiProvider;
