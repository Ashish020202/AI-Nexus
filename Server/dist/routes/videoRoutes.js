"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var video_1 = require("../controllers/video");
var router = (0, express_1.Router)();
router.post('/gen-video', video_1.generateVideo);
router.get('/check-video/:requestId', video_1.checkVideo);
router.get('/get-video/:requestId', video_1.getVideo);
exports.default = router;
