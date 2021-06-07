import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { UserList, ChatList } from "../../components";
import { userActions, messagesActions } from "../../redux/actions";
import { messagesApi, roomsApi } from "../../api";
import { Auth } from "../../components";
import socket from "../../core/soket";

import "./Chat.scss";

function Chat() {
    const location = useLocation();
    const dispatch = useDispatch();
    const roomName = location.pathname.split("/")[2];
    const userName = window.localStorage.userName;
    const [message, setMessage] = useState("");
    const allMyRooms = useSelector((state) => {
        return state.user.allMyRooms;
    });
    const room = useSelector((state) => {
        return state.user.room;
    });
    const messages = useSelector((state) => {
        return state.messages.items;
    });
    const onNewMessage = (data) => {
        dispatch(messagesActions.fetchMessages(roomName));
    };
    const onNewUser = (data) => {
        if (data.title === roomName) {
            roomsApi.getAllUsersInRoom(roomName).then(({ data }) => {
                dispatch(userActions.setUsersInCurrentRoom(data.users));
            });
        }
    };
    useEffect(() => {
        dispatch(userActions.fetchSetRoom(userName, roomName));
        roomsApi.getUserRooms(userName).then(({ data }) => {
            dispatch(userActions.setAllMyRooms(data));
        });
    }, []);
    useEffect(() => {
        dispatch(messagesActions.fetchMessages(roomName));
    }, []);
    useEffect(() => {
        socket.on("SERVER:MESSAGE_CREATED", onNewMessage);

        return () => socket.removeListener("SERVER:MESSAGE_CREATED", onNewMessage);
    }, []);
    useEffect(() => {
        socket.on("SERVER:NEW_USER_IN_ROOM", onNewUser);
        socket.on("SERVER:USER_EXIT", onNewUser);

        return () => {
            socket.removeListener("SERVER:NEW_USER_IN_ROOM", onNewUser);
            socket.removeListener("SERVER:USER_EXIT", onNewUser);
        };
    }, []);

    if (!window.localStorage.userName) {
        return <Auth />;
    }
    return (
        <div className='page'>
            <h1>Привет {userName}!</h1>
            <ChatList allMyRooms={allMyRooms}/>
            <UserList room={room} userName={userName} />

            <div className="messages">
                {messages
                    ? messages.map((item, index) => {
                          const date = new Date(item.create_on);
                          let dateString = "";
                          if (date.getDate().toString().length === 1) {
                              dateString += "0" + date.getDate() + ".";
                          } else {
                              dateString += date.getDate() + ".";
                          }
                          if ((date.getMonth() + 1).toString().length === 1) {
                              dateString += "0" + (date.getMonth() + 1) + ".";
                          } else {
                              dateString += date.getMonth() + 1 + ".";
                          }
                          dateString += date.getFullYear() + " ";
                          dateString += date.getHours() + ":" + date.getMinutes();

                          return (
                              <div
                                  key={index}
                                  className={classNames("message", {
                                      message_my: item.author === userName,
                                  })}
                              >
                                  <div className="message__text">{item.text}</div>
                                  <div className="message__info">
                                      {item.author === userName ? "" : item.author} {dateString}
                                  </div>
                              </div>
                          );
                      })
                    : "Загрузка..."}
            </div>
            <input
                className="message-input"
                type="text"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        messagesApi.sentMessage({ roomName, userName, message });
                        setMessage("");
                    }
                }}
            />
            <button
                className='sent'
                onClick={() => {
                    messagesApi.sentMessage({ roomName, userName, message });
                    setMessage("");
                }}
            >
                Отправить
            </button>
            <div className="exit">
                <button
                    onClick={() => {
                        roomsApi.userExit(room._id, userName).then(() => {
                            window.location.replace("http://localhost:3000/");
                        });
                    }}
                >
                    Выйти из чата
                </button>
            </div>
        </div>
    );
}

export default Chat;
