import io from "socket.io-client";
	
const socket = io.connect(process.env.REACT_APP_CLIENT_DOMAIN);

export default socket;