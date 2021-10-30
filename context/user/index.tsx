/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { UserContextType } from '@/interface/Context/UserContext';

const initialUserContext: UserContextType = {
    user: null,
    workplaces: [],
    setUser: () => {},
    setWorkplaces: () => {},
};

export const usercontext = createContext(initialUserContext);

const UserProvider = ({ children }: { children: JSX.Element }) => {
    const router = useRouter();
    const id = router.query.id as string[];
    const companyId = id && id[0];
    const [user, setUser] = useState(null);
    const [workplaces, setWorkplaces] = useState([]);


    return (
        <usercontext.Provider
            value={{
                user,
                workplaces,
                setUser,
                setWorkplaces,
            }}
        >
            {children}
        </usercontext.Provider>
    );
};

export default UserProvider;
