/*
    We initialize the socket outside the component tree.
    This prevents multiple connections from opening every time a screen re-renders, which is critical for supporting 1,000+ students.

   This listener along with it's companion store/useChatStore.ts should be initialized in the top-level component (e.g app/_layout.tsx).
   This acts as the "bridge" between the server and the global state.
   


*/

import { io, Socket } from "socket.io-client";

// Replace with your local machine IP for physical device testing
// or your production NestJS backend URL
const SOCKET_URL = "http://YOUR_BACKEND_IP:3000";

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false, // We connect manually after login
  transports: ["websocket"], // Faster for mobile apps
});