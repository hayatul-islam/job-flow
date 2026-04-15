import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import errorHandler from "./middleware/errorHandler";
import responseHandler from "./middleware/responseHandler";
import applicationRoutes from "./routes/application";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/category";
import jobRoutes from "./routes/job";
import profileRoutes from "./routes/profile";

dotenv.config();

const app = express();

app.use(express.json());
app.use(responseHandler);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/categories", categoryRoutes);
app.use("/applications", applicationRoutes);
app.use("/profile", profileRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
