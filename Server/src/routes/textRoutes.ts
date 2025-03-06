import { Router } from "express";
import { getTextGen } from "../controllers/text";

const router = Router();

router.post('/text-gen',getTextGen)

export default router;