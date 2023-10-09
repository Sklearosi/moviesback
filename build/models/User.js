"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _uuid = require("uuid");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userSchema = new _mongoose.default.Schema({
  name: {
    type: _mongoose.default.Schema.Types.String,
    required: true
  },
  email: {
    type: _mongoose.default.Schema.Types.String,
    required: true
  },
  password: {
    type: _mongoose.default.Schema.Types.String,
    required: true
  },
  id: {
    type: _mongoose.default.Schema.Types.String,
    required: true,
    default: _uuid.v4
  },
  bookmarks: {
    moviesId: {
      type: _mongoose.default.Schema.Types.Array
    }
  }
});
const User = _mongoose.default.model("User", userSchema);
var _default = exports.default = User;