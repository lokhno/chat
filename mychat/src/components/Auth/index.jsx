import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { userActions } from "../../redux/actions";

import "./Auth.scss";

const Auth = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");

    return (
        <div className="auth-page">
            <div>Введите имя пользователя </div>
            <input
                type="text"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        window.localStorage.userName = username;
                        if (document.location.pathname.split("/")[1] === "chat" && document.location.pathname.split("/")[2]) {
                            window.document.location.replace(`/chat/${document.location.pathname.split("/")[2]}`);
                        }
                        dispatch(userActions.setName(username));
                    }
                }}
            />
            <button
                onClick={() => {
                    window.localStorage.userName = username;
                    if (document.location.pathname.split("/")[1] === "chat" && document.location.pathname.split("/")[2]) {
                        window.document.location.replace(`/chat/${document.location.pathname.split("/")[2]}`);
                    }
                    dispatch(userActions.setName(username));
                }}
            >
                Войти
            </button>
        </div>
    );
};

export default Auth;
