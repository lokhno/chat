import { roomsApi } from "../../api";

const actions = {
    setName: (items) => ({
        type: "SET_NAME",
        payload: items,
    }),
    setRoom: (roomName) => ({
        type: "SET_ROOM",
        payload: roomName,
    }),
    setAllMyRooms: (rooms) => ({
        type: "SET_ALL_MY_ROOMS",
        payload: rooms,
    }),

    setUsersInCurrentRoom: (roomName) => ({
        type: "SET_USERS_IN_ROOM",
        payload: roomName,
    }),
    
    fetchSetRoom: (userName, roomName) => (dispatch) => {
        roomsApi.createOrEnterRoom({ userName, roomName }).then(({ data }) => {
            dispatch(actions.setRoom(data));
        });
    },

};

export default actions;
