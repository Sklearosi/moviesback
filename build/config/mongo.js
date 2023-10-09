"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const connect = async () => {
  try {
    const url = process.env.MONGO_URL;
    _mongoose.default.connect(url);
  } catch (error) {
    console.log(error);
    return error;
  }
};
var _default = exports.default = connect;