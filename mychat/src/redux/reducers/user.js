const initialState = {
    name: window.localStorage.userName,
    room: "",
    allMyRooms: [],
};

export default (state = initialState, action) => {

    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.payload };
        case "SET_ALL_MY_ROOMS": {
            return { ...state, allMyRooms: action.payload };
        }
        case "SET_ROOM":
            return { ...state, room: action.payload };
        case "SET_USERS_IN_ROOM":
            return { ...state, room: { ...state.room, users: action.payload } };
        default:
            return state;
    }
};
