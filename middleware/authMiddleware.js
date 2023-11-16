const jwt = require("jsonwebtoken");
const requestError = require("../helpers/requestError");
const wrapper = require("../helpers/controllerWrapper");

const User = require("../models/user");
require("dotenv").config();

const secret = process.env.secret;

const authorization = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    throw requestError(401);
  }

  const token = authHeader.split(" ")[1];

  const { id } = jwt.verify(token, secret, {}, (err, data) => {
    if (err) {
      throw requestError(401, err.message);
    }

    return data;
  });

  req.user = await User.findById(id, {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
  });

  next();
};

module.exports = { authorization: wrapper(authorization) };
