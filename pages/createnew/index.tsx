/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetServerSideProps } from 'next';
import { connectDb } from 'ssr/connectDb';
import { ssrPipe } from 'ssr/ssrPipe';
import { withSession } from 'ssr/withSession';
import { withUser } from 'ssr/withUser';
import React from 'react';
import CreatenewLayout from '@/components/layout/createnewLayout';
import ComponentWrapper from '@/components/layout/ComponentWrapper';
import { useFirstRender } from '@/hooks/useFirstRender';
import { action } from '@context/action';

interface Props {
    authenticated: boolean;
    workplaces: any;
    user: any;
    productCatagory: any[];
}

const CreateNew = ({ authenticated, workplaces, user, productCatagory }: Props) => {
    useFirstRender(
        action.checkAuthenticated({ authenticated }),
        action.getUser({ userdata: user }),
        action.getUserWorkplaces({ workplaces }),
        action.getProductCatagory({ productCatagory }),
    );

    return (
        <ComponentWrapper>
            <CreatenewLayout />
        </ComponentWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = ssrPipe(withSession, connectDb, withUser);

export default CreateNew;
