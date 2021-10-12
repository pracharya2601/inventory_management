import { connectToDB } from "db/connect";
import NextAuth, { } from "next-auth";
import Providers from "next-auth/providers";
import cryptoJs from 'crypto-js';

export default (req, res) => NextAuth(req, res, {
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  database: process.env.DATABASE_URL,
  pages: {
    signIn: '/signin',
    error: "/signinerror",
  },
  callbacks: {
    async session(session: any, user) {
      var newId = cryptoJs.AES.encrypt(user.id, 'user-id-encrypted').toString()[0];

      session.user.id = user.id
      return session
    },
    async jwt(tokenPayload, user, account, profile, isNewUser) {
      const { db } = await connectToDB()

      // if (isNewUser) {
      //   // const personalFolder = await folder.createFolder(db, { createdBy: `${user.id}`, name: 'Getting Started' })
      //   // await doc.createDoc(db, {
      //   //   name: 'Start Here',
      //   //   folder: personalFolder._id,
      //   //   createdBy: `${user.id}`,
      //   //   content: {
      //   //     time: 1556098174501,
      //   //     blocks: [
      //   //       {
      //   //         type: 'header',
      //   //         data: {
      //   //           text: 'Some default content',
      //   //           level: 2,
      //   //         },
      //   //       },
      //   //     ],
      //   //     version: '2.12.4',
      //   //   },
      //   // })
      //   console.log("hello")
      // }

      if (tokenPayload && user) {
        return { ...tokenPayload, id: `${user.id}` }
      }

      return tokenPayload
    },
    async signIn(user, account, profile) {
      //console.log("This is user:", user, "This is account", account, "This is profile", profile)
      return true;
    }
  },
})