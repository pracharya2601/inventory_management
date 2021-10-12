import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import jwt from 'next-auth/jwt'

export const config = {
  api: {
    bodyParser: false,
  },
};


export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const token = await jwt.getToken({ req, secret: process.env.JWT_SECRET })
  if (typeof token === "object" && !token) {
    res.end();
    return;
  }
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }
  res.end();
};
