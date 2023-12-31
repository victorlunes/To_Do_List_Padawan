import express from "express";
import connectDatabase from "./database/database.js";
import dotenv from "dotenv";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import taskRoute from "./routes/task.route.js";

dotenv.config();

const port = 3000;
const app = express();

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/task", taskRoute);

app.listen(port, () => console.log(`Server running on port: ${port}`));