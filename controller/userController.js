//@Method GET/api/tasks
//@desc  to get all task
//@access public
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, resp) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    resp.status(400).json({ error: "All field required" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const register = await User.create({
    username,
    email,
    password: hashPassword,
  });
  console.log(register);
  resp.status(201).json(register);
};
const userLogin = async (req, resp) => {
  const { email, password } = req.body;
  if (!email || !password) {
    resp.status(400).json({ error: "All field required" });
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_SECRET_TOKEN,
      { expiresIn: "150m" }
    );
    resp.status(200).json({ accessToken });
  } else {
    resp.status(500).json({ error: "Internal server Error" });
  }
};

const userCurrent = (req, resp) => {
  resp.status(200).json(req.user);
};

module.exports = [userRegister, userLogin, userCurrent];
