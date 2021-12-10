/* eslint-disable @typescript-eslint/no-unused-vars */
import { Db, MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { Session } from 'next-auth';
import { WorkplaceTypes } from '../Workplace/WorkplaceListTypes';

export interface PostFrontMatter {
    title: string;
    summary: string;
    publishedOn: string;
}

export interface Post {
    source: string;
    frontMatter: PostFrontMatter;
}

export interface UserSession {
    id: string;
    image: string;
    email: string;
    name: string;
}

export interface Request extends NextApiRequest {
    db: Db;
    dbClient: MongoClient;
    user: { email: string; id: string };
}

export interface UserData extends Session {
    id: string;
    image: string;
    email: string;
    name: string;
    workplaces: WorkplaceTypes[] | [];
}
