const express = require("express");
const router = express.Router();
const [
  userRegister,
  userLogin,
  userCurrent,
] = require("../controller/userController");
const validateToken = require("../middleware/validToken");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/current", validateToken, userCurrent);
module.exports = router;
