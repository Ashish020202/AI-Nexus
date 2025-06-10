import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/authRoutes";
import codeRouter from "./routes/codeRoutes";
import imageRouter from "./routes/ImageRoutes";
import musicRouter from "./routes/MusicRoutes";
import textRouter from "./routes/textRoutes";
import videoRouter from "./routes/videoRoutes";
import { connectDB } from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10001;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api', authRouter);
app.use('/api', codeRouter);
app.use('/api', imageRouter);
app.use('/api', musicRouter);
app.use('/api', textRouter);
app.use('/api', videoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
