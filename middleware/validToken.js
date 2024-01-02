const jwt = require("jsonwebtoken");

const validateToken = (req, resp, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
      if (err) {
        resp.status(401).json({ err: "User is not authorized" });
      }
      console.log(decoded);
      req.user = decoded.user;
      next();
    });
  }
};
module.exports = validateToken;
