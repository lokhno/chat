import axios from "axios";

//axios.defaults.headers.common["token"] = window.localStorage.token;

const messagesApi = {
    getMessage: (roomName) => {
        return axios.get(`http://localhost:3001/messages/${roomName}`);
    },
    sentMessage: ({ roomName, userName, message }) => {
        return axios.post("http://localhost:3001/messages", {
            room: roomName,
            user: userName,
            text: message,
        });
    },
};
export default messagesApi;
