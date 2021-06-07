import React from "react";

import { useSelector } from "react-redux";

import { Auth, EnterInChat } from "../../components";

function StartPage() {
    const nameFromRedux = useSelector((state) => state.user.name)
    return window.localStorage.userName || nameFromRedux ? (
        <EnterInChat />
    ) : (
        <Auth />
    )
}

export default StartPage;
