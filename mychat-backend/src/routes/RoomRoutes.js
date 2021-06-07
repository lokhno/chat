import { RoomCtrl } from "../controllers/index.js";

const RoomRoutes = (app, io) => {
    const RoomController = new RoomCtrl(io);

    app.post("/rooms", RoomController.create);
    app.post("/rooms/addUser/:id", RoomController.addUser);
    app.post("/rooms/deleteUser/:id", RoomController.deleteUser);
    app.get("/rooms/allusers/:roomName", RoomController.getAllUsersInRoom);
    app.get("/rooms/getUserRooms/:userName", RoomController.getUserRooms);
};

export default RoomRoutes;
