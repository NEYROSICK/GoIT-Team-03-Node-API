const User = require("../../models/user");

async function updateUser(req, res) {
  const { _id: userId } = req.user;
  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = updateUser;
