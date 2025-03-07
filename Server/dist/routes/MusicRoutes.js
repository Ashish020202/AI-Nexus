"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var music_1 = require("../controllers/music");
var music_2 = require("../controllers/music");
var router = (0, express_1.default)();
router.post('/gen-music', music_1.genMusic);
router.get('/check-music/:requestId', music_1.checkMusic);
router.get('/get-music/:requestId', music_2.getMusic);
exports.default = router;
