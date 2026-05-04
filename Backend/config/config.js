require("dotenv").config();

if (!process.env.PORT) {
  throw new Error("PORT is not defined in the environment variable");
}

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is not defined in the environment variable");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variable");
}

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = config;
