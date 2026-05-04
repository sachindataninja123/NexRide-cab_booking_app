const express = require("express");
const app = require("./src/app");
const config = require("./config/config");
const connectDB = require("./config/database");

const PORT = config.PORT || 8000;
connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
