import RoomModel from "../models/RoomModel.js";

class RoomCtrl {
    io;
    constructor(io) {
        this.io = io;
    }
    create = (req, res) => {
        const newUser = req.body.user;
        let currentRoom;
        const newRoomData = {
            title: req.body.title,
            create_on: new Date(),
            users: [req.body.user],
            // dialog_id: Schema.Types.ObjectId,
            // is_readed: Boolean,
        };
        RoomModel.findOne({ title: req.body.title }).then((data) => {
            if (!data) {
                new RoomModel(newRoomData)
                    .save()
                    .then((room) => {
                        res.json(room);
                    })
                    .catch((room) => {
                        res.status(500).json({ status: "error", room });
                    });
            } else {
                RoomModel.findById({ _id: data._id })
                    .then((room) => {
                        room.users = room.users.filter((user) => {
                            return !(user == newUser);
                        });
                        currentRoom = { ...room, users: room.users.push(newUser) };
                        RoomModel.findByIdAndUpdate({ _id: data._id }, currentRoom)
                            .then((data) => {
                                this.io.emit("SERVER:NEW_USER_IN_ROOM", { ...room }._doc);
                                res.json({ ...room }._doc);
                            })
                            .catch((message) => {
                                res.status(500).json({ status: "error", message });
                            });
                    })
                    .catch((message, err) => {
                        res.status(404).json({ status: "not found", message });
                    });
            }
        });
    };

    addUser = (req, res) => {
        const id = req.params.id;
        const newUser = req.body.user;
        let currentRoom;
        RoomModel.findById({ _id: id })
            .then((room) => {
                currentRoom = { ...room, users: room.users.push(newUser) };
                RoomModel.findByIdAndUpdate({ _id: id }, currentRoom)
                    .then((data) => {
                        res.json(currentRoom);
                    })
                    .catch((message) => {
                        res.status(500).json({ status: "error", message });
                    });
            })
            .catch((message) => {
                res.status(404).json({ status: "not found", message });
            });
    };
    deleteUser = (req, res) => {
        const id = req.params.id;
        const excludetUser = req.body.user;
        let currentRoom;
        RoomModel.findById({ _id: id })
            .then((room) => {
                room.users = room.users.filter((user) => {
                    return !(user == excludetUser);
                });
                currentRoom = { ...room, users: room.users };
                RoomModel.findByIdAndUpdate({ _id: id }, currentRoom)
                    .then((data) => {
                        this.io.emit("SERVER:USER_EXIT", room);
                        res.json(data);
                    })
                    .catch((message) => {
                        res.status(500).json({ status: "error", message });
                    });
            })
            .catch((message) => {
                res.status(500).json({ status: "error", message });
            });
    };
    getAllUsersInRoom = (req, res) => {
        const roomName = req.params.roomName;
        RoomModel.findOne({ title: roomName })
            .then((room) => {
                res.json({ users: room.users });
            })
            .catch((message, err) => {
                res.status(404).json({ status: "not found", message });
            });
    };
    getUserRooms = (req, res) => {
        const userName = req.params.userName;
        RoomModel.find()
            .then((rooms) => {
                res.json(rooms.filter((item) => item.users.includes(userName)));
            })
            .catch((message, err) => {
                res.status(404).json({ status: "not found", message });
            });
    };
}

export default RoomCtrl;
