import React from "react";

function UserList({ room, userName }) {
    return (
        <div>
            В чате <strong>{room.title}</strong> находятся следующие пользователи:
            <div className="users">
                {room.users
                    ? room.users.map((item, index) => {
                          if (userName !== item) return <div key={index}>{item}</div>;
                      })
                    : "Загрузка..."}
            </div>
        </div>
    );
}

export default UserList;
