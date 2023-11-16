const getCurrentUser = require("./getCurrentUser");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const wrapper = require("../../helpers/controllerWrapper");

module.exports = {
  getCurrentUser: wrapper(getCurrentUser),
  updateSubscription: wrapper(updateSubscription),
  updateAvatar: wrapper(updateAvatar),
};
