"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var text_1 = require("../controllers/text");
var router = (0, express_1.Router)();
router.post('/text-gen', text_1.getTextGen);
exports.default = router;
