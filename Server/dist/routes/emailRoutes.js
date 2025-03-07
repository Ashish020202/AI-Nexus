"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var email_1 = require("../controllers/email");
var router = (0, express_1.Router)();
router.post('/gen-email', email_1.genEmail);
exports.default = router;
