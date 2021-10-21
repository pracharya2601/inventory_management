/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
type PipedGetServerSideProps = (arg?: any) => Promise<any> | any;

export const ssrPipe =
    (...functions: PipedGetServerSideProps[]) =>
    async (
        input: any,
    ): Promise<{
        props: Object;
    }> => {
        const { session, db, query, ...rest } = await functions.reduce(
            (chain, func) => chain.then(func),
            Promise.resolve(input),
        );

        return {
            props: { authenticated: session && session.user ? true : false, ...rest },
        };
    };
