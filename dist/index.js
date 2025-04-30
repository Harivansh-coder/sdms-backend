"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./routes/auth"));
const orders_1 = __importDefault(require("./routes/orders"));
const partners_1 = __importDefault(require("./routes/partners"));
const assignments_1 = __importDefault(require("./routes/assignments"));
const env_1 = require("./utils/env");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});
app.use("/api/auth", auth_1.default);
app.use("/api/orders", orders_1.default);
app.use("/api/partners", partners_1.default);
app.use("/api/assignments", assignments_1.default);
exports.default = app;
// start server for development environment
if (env_1.envVariables.NODE_ENV === "development") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
