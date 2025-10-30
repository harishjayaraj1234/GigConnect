import chatModel from '../models/chatModel.js'
import userAuth from '../middleware/userAuth.js'

const socketHandler = (io) => {
    io.on("connection", (socket) => {

        socket.on("send_message", async(data) => {
           
            let bookingId = data.bookingId;
            let senderId = data.senderId;
            let message = data.text;
            let date = Date.now();

            const chatting = await chatModel({bookingId, senderId, message, date})
            chatting.save()

            socket.broadcast.emit("receive_message", data);
        
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
} 
export default socketHandler;
