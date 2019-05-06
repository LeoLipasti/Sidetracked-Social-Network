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
    return state;
}
