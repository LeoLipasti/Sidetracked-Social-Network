import * as io from "socket.io-client";
import { onlineUsers, userJoined, userLeft, chatMessage } from "./actions";
// or this file

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();
        socket.on("onlineUsers", users => {
            store.dispatch(onlineUsers(users));
        });

        socket.on("userJoined", user => {
            store.dispatch(userJoined(user));
        });

        socket.on("userLeft", userId => {
            store.dispatch(userLeft(userId));
        });

        socket.on("chatMessage", userMessage => {
            store.dispatch(chatMessage(userMessage));
        });
    }
}
