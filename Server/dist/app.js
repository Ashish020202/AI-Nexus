"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var ImageRoutes_1 = __importDefault(require("./routes/ImageRoutes"));
var videoRoutes_1 = __importDefault(require("./routes/videoRoutes"));
var emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
var MusicRoutes_1 = __importDefault(require("./routes/MusicRoutes"));
var textRoutes_1 = __importDefault(require("./routes/textRoutes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use('/api', ImageRoutes_1.default);
app.use('/api', videoRoutes_1.default);
app.use('/api', emailRoutes_1.default);
app.use('/api', MusicRoutes_1.default);
app.use('/api', textRoutes_1.default);
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
