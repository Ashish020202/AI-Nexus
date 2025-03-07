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
exports.genEmail = void 0;
var axios_1 = __importDefault(require("axios"));
var node_mailjet_1 = __importDefault(require("node-mailjet"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var HUGGING_FACE_TOKEN = process.env.HUGGING_FACE_TOKEN;
var HUGGING_FACE_API_URL = process.env.HUGGING_FACE_API_URL_;
var generateEmailContent = function (emailType, userDetails) { return __awaiter(void 0, void 0, void 0, function () {
    var prompt, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prompt = "Write a professional and structured ".concat(emailType, " email based on the following details: ").concat(userDetails, ". \n    - Start with a proper greeting.\n    - Clearly state the purpose of the email.\n    - End with a polite closing statement.\n    - Keep the response well-formatted and readable.");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.post(HUGGING_FACE_API_URL || '', { inputs: prompt }, { headers: { Authorization: "Bearer ".concat(process.env.HUGGING_FACE_TOKEN) } })];
            case 2:
                response = _a.sent();
                console.log("Full response:", JSON.stringify(response.data, null, 2));
                // ✅ Extract the text correctly
                if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].generated_text) {
                    return [2 /*return*/, response.data[0].generated_text];
                }
                else {
                    return [2 /*return*/, "Sorry, we couldn't generate the email content. Please try again."];
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error generating email:", error_1);
                return [2 /*return*/, "Error generating email content."];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Mailjet Email Sender
var sendEmail = function (to, from, subject, body) { return __awaiter(void 0, void 0, void 0, function () {
    var mailjet, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mailjet = node_mailjet_1.default.apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, mailjet.post("send", { version: "v3.1" }).request({
                        Messages: [
                            {
                                From: { Email: from, Name: "Your Service" },
                                To: [{ Email: to, Name: "Recipient" }],
                                Subject: subject,
                                TextPart: body,
                                HTMLPart: "<html><body><p>".concat(body.replace(/\n/g, "<br>"), "</p></body></html>"), // Proper formatting
                            },
                        ],
                    })];
            case 2:
                result = _a.sent();
                console.log("Mailjet Response:", JSON.stringify(result.body, null, 2));
                console.log("Email sent:", result.body);
                return [2 /*return*/, { success: true, data: result.body }];
            case 3:
                error_2 = _a.sent();
                console.error("Error sending email:", error_2.message);
                return [2 /*return*/, { success: false, error: error_2.message }];
            case 4: return [2 /*return*/];
        }
    });
}); };
var genEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, to, from, emailType, userDetails, emailContent, subject, emailResponse;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, to = _a.to, from = _a.from, emailType = _a.emailType, userDetails = _a.userDetails;
                if (!to || !from || !emailType || !userDetails) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "All fields are required." })];
                }
                return [4 /*yield*/, generateEmailContent(emailType, userDetails)];
            case 1:
                emailContent = _b.sent();
                subject = "Automated Email: ".concat(emailType);
                return [4 /*yield*/, sendEmail(to, from, subject, emailContent)];
            case 2:
                emailResponse = _b.sent();
                if (emailResponse.success) {
                    res.status(200).json({ success: true, message: "AI-generated email sent successfully!" });
                }
                else {
                    res.status(500).json({ success: false, message: "Failed to send AI-generated email." });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.genEmail = genEmail;
