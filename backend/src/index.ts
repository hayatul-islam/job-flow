import dotenv from "dotenv";
import express from "express";
import errorHandler from "./middleware/errorHandler";
import responseHandler from "./middleware/responseHandler";

dotenv.config();
const app = express();

app.use(express.json());
app.use(responseHandler);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
