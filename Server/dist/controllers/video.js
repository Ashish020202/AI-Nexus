"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideo = exports.checkVideo = exports.generateVideo = void 0;
var client_1 = require("@fal-ai/client");
// import { FAL_AI_API_KEY, FAL_AI_API_URL } from '../config';
client_1.fal.config({ credentials: process.env.FAL_KEY });
var generateVideo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, prompt_1, webhookUrl, request_id, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, prompt_1 = _a.prompt, webhookUrl = _a.webhookUrl;
                if (!prompt_1)
                    return [2 /*return*/, res.status(400).json({ error: "Prompt is required" })];
                return [4 /*yield*/, client_1.fal.queue.submit("fal-ai/hunyuan-video", {
                        input: { prompt: prompt_1 },
                        webhookUrl: webhookUrl || undefined,
                    })];
            case 1:
                request_id = (_b.sent()).request_id;
                return [2 /*return*/, res.json({ message: "Video generation started", requestId: request_id })];
            case 2:
                error_1 = _b.sent();
                console.error("Error generating video:", error_1);
                return [2 /*return*/, res.status(500).json({ error: "Video generation failed" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.generateVideo = generateVideo;
var checkVideo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestId, status_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                requestId = req.params.requestId;
                return [4 /*yield*/, client_1.fal.queue.status("fal-ai/hunyuan-video", { requestId: requestId, logs: true })];
            case 1:
                status_1 = _a.sent();
                return [2 /*return*/, res.json(status_1)];
            case 2:
                error_2 = _a.sent();
                console.error("Error fetching video status:", error_2);
                return [2 /*return*/, res.status(500).json({ error: "Failed to fetch status" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkVideo = checkVideo;
var getVideo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestId, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                requestId = req.params.requestId;
                return [4 /*yield*/, client_1.fal.queue.result("fal-ai/hunyuan-video", { requestId: requestId })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json({ videoUrl: result.data })];
            case 2:
                error_3 = _a.sent();
                console.error("Error fetching video result:", error_3);
                return [2 /*return*/, res.status(500).json({ error: "Failed to fetch video" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getVideo = getVideo;
exports.default = { generateVideo: exports.generateVideo, getVideo: exports.getVideo, checkVideo: exports.checkVideo };
