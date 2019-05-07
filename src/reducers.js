export default function(state = {}, action) {
    if (action.type == "GET_USERS") {
        state = {
            ...state,
            users: action.users
        };
    }
    if (action.type == "ADD_FRIEND") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id != action.id) {
                    return user;
                }
                return {
                    ...user,
                    accepted: action.type == "ADD_FRIEND"
                };
            })
        };
    } else if (action.type == "REMOVE_FRIEND") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id != action.id) {
                    return user;
                }
                return {
                    ...user,
                    removed: action.type == "REMOVE_FRIEND"
                };
            })
        };
    }
    if (action.type == "ONLINE_USERS") {
        state = {
            ...state,
            onlineusers: action.users
        };
    }
    if (action.type == "ONLINE_USERS_ADD") {
        state = {
            ...state,
            onlineusers: state.onlineusers.concat(action.user)
        };
    }
    if (action.type == "ONLINE_USERS_REMOVE") {
        state = {
            ...state,
            onlineusers: state.onlineusers.map(user => {
                if (user.id != action.id) {
                    return user;
                }
            })
        };
    }
    return state;
}
