const socketHandler = async (io) => {
    io.on('connection', (socket) => {
        console.log("user connected "+socket.id);
        
        socket.on('message', (data) => {
            console.log(data);
        })
        
        socket.on('disconnect', () => {
            console.log('User disconnected:');
        })
    })
} 
export default socketHandler;