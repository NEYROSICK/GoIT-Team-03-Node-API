const getCurrentUser = async (req, res, next) => {
  const { email, subscription } = req.user;

  const response = {
    email,
    subscription,
  };

  res.status(200).json(response);
};

module.exports = getCurrentUser;
