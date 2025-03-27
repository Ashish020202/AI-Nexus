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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

app.use('/api',imageRouter)
app.use('/api',videoRouter)
app.use('/api',musicRouter)
app.use('/api',textRouter);
app.use('/api',codeRouter);
app.use('/api',authRouter)



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
