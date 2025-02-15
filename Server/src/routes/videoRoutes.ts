import { Router } from "express";
import { generateVideo,checkVideo,getVideo } from "../controllers/video";

const router = Router();

router.post('/gen-video',generateVideo);
router.get('/check-video/:requestId',checkVideo);
router.get('/get-video/:requestId',getVideo)

export default router;