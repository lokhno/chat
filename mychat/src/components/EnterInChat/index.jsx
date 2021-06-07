import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./EnterInChat.scss";

const EnterInChat = () => {
    const [roomName, setRoomName] = useState("");
    return (
        <div>
            <div className="auth-page">
                <div>Введите имя комнаты </div>
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => {
                        setRoomName(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            document.location.replace(`/chat/${roomName}`)
                        }
                    }}
                />
                <Link to={`/chat/${roomName}`}>
                    <button>Войти</button>
                </Link>
            </div>
            
        </div>
    );
};

export default EnterInChat;
