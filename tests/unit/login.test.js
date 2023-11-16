jest.mock("../../models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../helpers/requestError", () => {
  return jest.fn((statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  });
});

const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = require("../../controllers/auth/login");

describe("login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should perform succesful authentication with correct data", async () => {
    const user = {
      email: "dhatak24@gmail.com",
      password: "12341234",
      verify: true,
      id: "user_id",
      subscription: "starter",
    };

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mocked_token");

    const req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "mocked_token",
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  });

  it("should throw an error because of incorrect email", async () => {
    User.findOne.mockResolvedValue(null);
    const req = {
      body: {
        email: "nonexistent@example.com",
        password: "password123",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    try {
      await login(req, res);
    } catch (error) {
      console.log("Error Status Code:", error.statusCode);
      console.log("Error Message:", error.message);
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe("Email is wrong");
    }
  });
});
