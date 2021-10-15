import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";

const socket = io(
	process.env.NODE_END === "production"
		? process.env.PUBLIC_URL
		: process.env.REACT_APP_SERVER_URL
);
const client = feathers();

client.configure(socketio(socket));
client.configure(
	auth({
		storage: window.localStorage,
	})
);

export default client;
