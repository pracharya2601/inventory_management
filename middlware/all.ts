import nc from 'next-connect';
import db from './db';
import auth from './auth';

const middleware = nc();
export const withoutAuthMiddleWere = nc();

middleware.use(db).use(auth);
export default middleware;
