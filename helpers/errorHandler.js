const errorHandler = (err) => {
  console.log(err);
  if (err.message.includes("ENOENT")) {
    return { status: 500, message: "Internal Server Error" };
  } else if (err.kind === "ObjectId") {
    return { status: 404, message: "Not Found" };
  } else if (err.code === 11000) {
    return { status: 409, message: "Email in use" };
  }
  return err;
};

module.exports = errorHandler;
