"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("better-auth/node");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const auth_1 = require("./lib/auth");
const errorHandler_1 = require("./middleware/errorHandler");
const category_route_1 = require("./modules/category/category.route");
const medicine_route_1 = require("./modules/medicine/medicine.route");
const order_route_1 = require("./modules/order/order.route");
const review_route_1 = require("./modules/review/review.route");
const user_route_1 = require("./modules/user/user.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.all("/api/auth/*splat", (0, node_1.toNodeHandler)(auth_1.auth));
app.use("/api/v1/categories", category_route_1.categoryRouter);
app.use("/api/v1/medicines", medicine_route_1.medicineRouter);
app.use("/api/v1/users", user_route_1.userRouter);
app.use("/api/v1/orders", order_route_1.orderRouter);
app.use("/api/v1/reviews", review_route_1.reviewRouter);
app.use("/", (req, res) => {
    res.json({ message: "Welcome MediStore Home" });
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map