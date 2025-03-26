import { Router } from "express";
import generateCode from "../controllers/code";

const router = Router();

router.post('/code',generateCode)

export default router