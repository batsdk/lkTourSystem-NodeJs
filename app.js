require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// Packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// ConnectDb
const connectDB = require("./db/connect");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Import routes
const authRouter = require("./Routes/authRouter");
const placeRouter = require("./Routes/placeRouter");
const reviewRouter = require("./Routes/reviewRouter");
const favoritesRouter = require("./Routes/favoriteRouter");

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/places", placeRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/favorites", favoritesRouter);

// Extrra packages uses
app.use(cookieParser(process.env.JWT_SECRET));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Listening on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
