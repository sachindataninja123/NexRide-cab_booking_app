const express = require("express");
const app = require("./src/app");
const config = require("./config/config");
const connectDB = require("./config/database");
const http = require('http');
const { initializeSocket } = require('./socket');

const server = http.createServer(app);

initializeSocket(server);


const PORT = config.PORT || 8000;
connectDB()

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
