import Router from 'express'
import { checkMusic, genMusic } from '../controllers/music';
import { getMusic } from '../controllers/music';

const router = Router();

router.post('/gen-music',genMusic);
router.get('/check-music/:requestId',checkMusic)
router.get('/get-music/:requestId',getMusic)

export default router