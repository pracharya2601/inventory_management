/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from 'next/head';
import React from 'react';
import { GetServerSideProps } from 'next';
import { ssrPipe } from 'ssr/ssrPipe';
import { withSession } from 'ssr/withSession';
import ComponentWrapper from '@/components/layout/ComponentWrapper';

const Privacy = () => {
    return <ComponentWrapper></ComponentWrapper>;
};
export default Privacy;
