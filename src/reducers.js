export default function(state = {}, action) {
    if (action.type == "GET_USERS") {
        state = {
            ...state,
            users: action.users
        };
    }
    return state;
}
