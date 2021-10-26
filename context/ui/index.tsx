/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const uicontext = createContext({
    searchBar: false,
    searchTerm: '',
    setSearchTerm: (term: string) => {},
    setSearchBar: (type: boolean) => {},
});

const UiProvider = ({ children }: { children: JSX.Element }) => {
    const [searchBar, setSearchBar] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    return (
        <uicontext.Provider value={{ searchBar, searchTerm, setSearchBar, setSearchTerm }}>
            {children}
        </uicontext.Provider>
    );
};

export default UiProvider;
