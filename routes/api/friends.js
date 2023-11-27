const express = require("express");
const ctrlFriend = require("../../controllers/friends");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();


router.get("/", wrapper(ctrlFriend.friends));
module.exports = router;