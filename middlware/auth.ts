import jwt from 'next-auth/jwt';

interface Token {
    [key: string]: any;
}

export default async (req, res, next) => {
    const token: Token = await jwt.getToken({ req, secret: process.env.JWT_SECRET });

    if (token) {
        // Signed in
        req.user = token;
        next();
    } else {
        // Not Signed in
        res.status(401);
        res.end();
    }
};
