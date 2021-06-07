import MessageModel from "../models/MessageModel.js";

class MessageCtrl {
    io;
    constructor(io) {
        this.io = io;
    }
    create = (req, res) => {
        const data = {
            text: req.body.text,
            create_on: new Date(),
            author: req.body.user,
            room: req.body.room,
        };

        new MessageModel(data)
            .save()
            .then((message) => {
                this.io.emit("SERVER:MESSAGE_CREATED", message);
                res.json(message);
            })
            .catch((message) => {
                res.status(500).json({ status: "error", message });
            });
    };
    read = (req, res) => {
        const roomName = req.params.room;
        MessageModel.find({ room: roomName }).exec(function (err, messages) {
            if (err) {
                return res.status(404).json({ message: `Message not found` });
            }
            return res.json(messages);
        });
    };
}

export default MessageCtrl;

// update = (req, res) => {

//     const attribute = Object.keys(req.query)[0];

//     const data = {};
//     data[attribute] = req.query[attribute];
//     const id = req.params.id;

//     MessageModel.findByIdAndUpdate({ _id: id }, data)
//         .then((message) => {
//             res.json(message);
//         })
//         .catch((message) => {
//             res.status(500).json({ status: "error", message });
//         });
// };
// delete = (req, res) => {

//     const id = req.query.id;
//     MessageModel.findOneAndDelete({ _id: id })
//         .then((message) => {
//             if (message) {
//                 res.json({ message: `Message ${message._id} deleted` });
//             }
//         })
//         .catch((message) => {
//             res.json({ status: "error", message });
//         });
// };
