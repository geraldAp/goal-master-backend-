import './configs/loadEnv.js'
import express, { urlencoded, json } from "express";
import cors from "cors";
import {dbConnect} from './configs/dbConnect.js'
import errorHandler from "./middleware/errorHandler.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import logger from "./middleware/logger.js";
import authRoutes from "./routes/authRoute.js";
import goalRoutes from "./routes/goalsRoute.js";
import verificationRoutes from "./routes/verificationRoute.js";
import resetPasswordRoutes from './routes/resetPasswordRoute.js';
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

const Port = process.env.PORT || 8080;
app.listen(Port, () => {
  console.log(`Server has connect successFully on port ${Port}`);
});
