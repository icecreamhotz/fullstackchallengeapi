module.exports = (app, server) => {
  let socketIO = require("socket.io").listen(server);
  global.socketIO = socketIO;

  socketIO.sockets.on("connection", socket => {
    console.log("connected");
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
};
