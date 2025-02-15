import { Router } from "express";
import generateImage from "../controllers/image";

const router = Router();

router.post('/gen-Image',generateImage)

export default router;