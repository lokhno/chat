import mongoose from "mongoose";

const Schema = mongoose.Schema;
const RoomSchema = new Schema({
    title: { type: String, required: true },
    create_on: Date,
    users: [{ type: String }],
});

const RoomModel = mongoose.model("Room", RoomSchema);

export default RoomModel;
