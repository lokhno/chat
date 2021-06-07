import { messagesApi } from "../../api";

const actions = {
    setMessages: (items) => ({
        type: "SET_MESSAGES",
        payload: items,
    }),
    fetchMessages: (roomName) => (dispatch) => {
        
        messagesApi
            .getMessage(roomName)
            .then(({ data }) => {
                dispatch(actions.setMessages(data));
            })
            
    },
};

export default actions;
