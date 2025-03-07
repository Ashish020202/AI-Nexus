import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import imageRouter from "./routes/ImageRoutes"
import videoRouter from "./routes/videoRoutes"
import musicRouter from "./routes/MusicRoutes"
import textRouter from "./routes/textRoutes"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

app.use('/api',imageRouter)
app.use('/api',videoRouter)
app.use('/api',musicRouter)
app.use('/api',textRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
