import Router from 'express'
import { genMusic } from '../controllers/music';
import { getMusic } from '../controllers/music';

const router = Router();

router.post('/gen-music',genMusic);
router.get('/get-music',getMusic)