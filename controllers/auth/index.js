const wrapper = require("../../helpers/controllerWrapper");
const login = require("./login");
const logout = require("./logout");
const register = require("./registration");
const sendVerifyRequest = require("./sendVerifyRequest");
const verification = require("./verification");

module.exports = {
  register: wrapper(register),
  login: wrapper(login),
  logout: wrapper(logout),
  verification: wrapper(verification),
  sendVerifyRequest: wrapper(sendVerifyRequest),
};
