"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const responseHandler_1 = __importDefault(require("./middleware/responseHandler"));
const application_1 = __importDefault(require("./routes/application"));
const auth_1 = __importDefault(require("./routes/auth"));
const category_1 = __importDefault(require("./routes/category"));
const job_1 = __importDefault(require("./routes/job"));
const profile_1 = __importDefault(require("./routes/profile"));
dotenv_1.default.config();
const allowedOrigins = (process.env.FRONTEND_URL || "")
    .split(",")
    .filter(Boolean);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(responseHandler_1.default);
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
app.use("/auth", auth_1.default);
app.use("/jobs", job_1.default);
app.use("/categories", category_1.default);
app.use("/applications", application_1.default);
app.use("/profile", profile_1.default);
app.use(errorHandler_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
