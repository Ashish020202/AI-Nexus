import { Router } from "express";
import { genEmail } from "../controllers/email";

const router = Router();

router.post('/gen-email',genEmail)

export default router;