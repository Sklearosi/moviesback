"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _authMiddleware = _interopRequireDefault(require("../middlewares/auth-middleware.js"));
var _authController = require("../controller/auth-controller.js");
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const authRouter = _express.default.Router();
authRouter.post("/register", _authController.createUser);
authRouter.post("/login", _authController.login);
authRouter.get("/users", _authMiddleware.default, _authController.getAllUser);
var _default = exports.default = authRouter;