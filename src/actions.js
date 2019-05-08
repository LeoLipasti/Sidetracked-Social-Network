// axios actions
import axios from "./axios";

export async function getFriends() {
    const { data } = await axios.get("/state/friendsnrequests", {
        headers: {
            getme: "friendships"
        }
    });
    return {
        type: "GET_USERS",
        users: data
    };
}

export async function friendRequests(id) {
    await axios.post("/state/friendrequests", {
        getme: "friendships",
        id: id
    });
    return {
        type: "ADD_FRIEND",
        id
    };
}

export async function friendRemoval(id) {
    await axios.post("/state/friendrequests", {
        getme: "friendships",
        id: id
    });
    return {
        type: "REMOVE_FRIEND",
        id
    };
}

// socket io
export async function onlineUsers(users) {
    return {
        type: "ONLINE_USERS",
        users
    };
}

export async function userJoined(user) {
    return {
        type: "ONLINE_USER_ADD",
        user
    };
}

export async function userLeft(user) {
    return {
        type: "ONLINE_USER_REMOVE",
        user
    };
}

export async function chatMessage(message) {
    console.log("chat message");
    return {
        type: "ONLINE_CHAT_MESSAGE",
        message
    };
}
