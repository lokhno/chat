import mongoose from "mongoose";

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    text: { type: String, required: true },
    create_on: Date,
    author: String,
    room: String,
});

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
