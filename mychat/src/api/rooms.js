import axios from "axios";


//axios.defaults.headers.common["token"] = window.localStorage.token;

const roomsApi = {
    createOrEnterRoom: ({ userName, roomName }) => {
        return axios.post("http://localhost:3001/rooms", {
            title: roomName,
            user: userName,
        });
    },
    getAllUsersInRoom: (roomName) => {
        return axios.get(`http://localhost:3001/rooms/allusers/${roomName}`);
    },
    getUserRooms: (userName) => {
        return axios.get(`http://localhost:3001/rooms/getUserRooms/${userName}`);
    },
    userExit: (roomID, userName) => {
        return axios.post(`http://localhost:3001/rooms/deleteUser/${roomID}`, {
            user: userName
        });
    },
};
export default roomsApi;
