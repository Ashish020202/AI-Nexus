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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMusic = exports.checkMusic = exports.genMusic = void 0;
var axios_1 = __importDefault(require("axios"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var FAL_KEY = process.env.FAL_KEY;
var FAL_API_URL = "https://queue.fal.run/fal-ai/minimax-music";
var genMusic = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, prompt_1, reference_audio_url, response, requestId, error_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, prompt_1 = _a.prompt, reference_audio_url = _a.reference_audio_url;
                if (!prompt_1 || !reference_audio_url) {
                    res.status(400).json({ error: "Prompt and reference_audio_url are required" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, axios_1.default.post(FAL_API_URL, { prompt: prompt_1, reference_audio_url: reference_audio_url }, {
                        headers: {
                            Authorization: "Key ".concat(FAL_KEY),
                            "Content-Type": "application/json",
                        },
                    })];
            case 1:
                response = _c.sent();
                requestId = (_b = response.data) === null || _b === void 0 ? void 0 : _b.request_id;
                if (!requestId) {
                    res.status(500).json({ error: "Failed to get request ID" });
                    return [2 /*return*/];
                }
                res.json({ requestId: requestId });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                console.error("Error submitting request:", error_1);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.genMusic = genMusic;
var checkMusic = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestId, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                requestId = req.params.requestId;
                return [4 /*yield*/, axios_1.default.get("".concat(FAL_API_URL, "/requests/").concat(requestId, "/status"), {
                        headers: { Authorization: "Key ".concat(FAL_KEY) },
                    })];
            case 1:
                response = _a.sent();
                res.json(response.data);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error fetching request status:", error_2);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkMusic = checkMusic;
var getMusic = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestId, response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                requestId = req.params.requestId;
                return [4 /*yield*/, axios_1.default.get("".concat(FAL_API_URL, "/requests/").concat(requestId), {
                        headers: { Authorization: "Key ".concat(FAL_KEY) },
                    })];
            case 1:
                response = _a.sent();
                res.json(response.data);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error fetching result:", error_3);
                res.status(500).json({ error: "Internal server error" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMusic = getMusic;
