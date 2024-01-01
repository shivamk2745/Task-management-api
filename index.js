const express = require("express");
const dbConnect = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();

dbConnect();
const port = process.env.PORT || 4501;

app.use(express.json());
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`The server is running on port :${port}`);
});
