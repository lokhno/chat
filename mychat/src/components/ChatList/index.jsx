import React from "react";

function ChatList({ allMyRooms }) {
    return (
        <div>
            Все чаты в которые ты зашел:
            {allMyRooms
                ? allMyRooms.map((item) => {
                      return (
                          <div>
                              <a key={item._id} href={`/chat/${item.title}`}>
                                  {item.title}
                              </a>
                          </div>
                      );
                  })
                : "Загрузка..."}
        </div>
    );
}

export default ChatList;
