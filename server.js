require("dotenv").config();
import express, { urlencoded, json } from "express";
import cors from "cors";
import dbConnect from "./configs/dbConnect";
import errorHandler from "./middleware/errorHandler";
import notFoundHandler from "./middleware/notFoundHandler";
import logger from "./middleware/logger";
import authRoutes from "./routes/authRoute";
import goalRoutes from "./routes/goalsRoute";
import verificationRoutes from "./routes/verificationRoute";
import resetPasswordRoutes from './routes/resetPasswordRoute';
const app = express();

// general middle wares
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

// mongo connection
dbConnect();

// custom Middleware
app.use(logger);

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/verification", verificationRoutes);
app.use('/api/v1/resetPassword',resetPasswordRoutes)
app.use("/api/v1/goals", goalRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

Port = process.env.PORT || 8080;
app.listen(Port, () => {
  console.log(`Server has connect successFully on port ${Port}`);
});
