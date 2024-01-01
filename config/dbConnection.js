const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connectMongo = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "connection created",
      connectMongo.connection.host,
      connectMongo.connection.name
    );
  } catch (err) {
    console.log(err);
  }
};
module.exports = dbConnect;
