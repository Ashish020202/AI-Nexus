import { Router } from "express";
import generateImage, { getImage } from "../controllers/image";

const router = Router();

router.post('/gen-Image',generateImage)
router.get('/result/:requestId',getImage)

export default router;