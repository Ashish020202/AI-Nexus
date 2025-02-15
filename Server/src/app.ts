import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import imageRouter from "./routes/ImageRoutes"
import videoRouter from "./routes/videoRoutes"
import emailRouter from "./routes/emailRoutes"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api',imageRouter)
app.use('/api',videoRouter)
app.use('/api',emailRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
