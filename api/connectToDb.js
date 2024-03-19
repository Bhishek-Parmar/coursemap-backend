const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

// console.log(process.env.DB_URL);

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectToDb() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.DB_URL, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  }
}
// run().catch(console.dir);
module.exports = connectToDb;
