import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL as string)
  .then((data) => {
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, () => {
      console.info(`The server is running successfully on port: ${PORT}`);
    });
  })
  .catch((err) => console.log("Error on connection MongoDB", err));
