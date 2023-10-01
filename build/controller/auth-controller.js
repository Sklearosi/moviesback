"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.createUser = void 0;
var _User = _interopRequireDefault(require("../models/User"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _addUserSchema = _interopRequireDefault(require("../schemas/add-user-schema.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createUser = async (req, res) => {
  const {
    body
  } = req;
  try {
    const validator = await (0, _addUserSchema.default)(body);
    const {
      value,
      error
    } = validator.validate(body);
    if (error) {
      return res.status(401).json(error.details);
    }
    const {
      name,
      email,
      password
    } = value;
    const salt = await _bcrypt.default.genSalt(10);
    const hashedPassword = await _bcrypt.default.hash(password, salt);
    const newUser = new _User.default({
      name,
      email,
      password: hashedPassword
    });
    newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(401).json(error);
  }
};
exports.createUser = createUser;
const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const user = await _User.default.findOne({
      email
    }, {
      _id: 0,
      __v: 0
    }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "user not found"
      });
    }
    const result = await _bcrypt.default.compare(password, user.password);
    if (result) {
      const signData = {
        name: user.name,
        id: user.id
      };
      const token = _jsonwebtoken.default.sign(signData, process.env.JWT_SECRET);
      return res.status(200).json({
        ...signData,
        token
      });
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};
exports.login = login;