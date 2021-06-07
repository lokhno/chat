import { MessageCtrl } from "../controllers/index.js";

const MessageRoutes = (app, io) => {
    const MessageController = new MessageCtrl(io);
    app.post("/messages", MessageController.create);
    app.get("/messages/:room", MessageController.read);
    
};

export default MessageRoutes;

// app.delete("/messages", MessageController.delete);
// app.get("/messages/update/:id", MessageController.update);