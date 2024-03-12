import io from "socket.io-client";

const socket = io.connect(import.meta.env.VITE_CLIENT_DOMAIN);

export default socket;
