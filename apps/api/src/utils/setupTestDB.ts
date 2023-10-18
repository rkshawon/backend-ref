import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { connect } from "mongoose";

// let mongo: MongoMemoryServer | null = null;

// const connectDB = async () => {
//   mongo = await MongoMemoryServer.create();
//   const uri = mongo.getUri();

//   await mongoose.connect(uri);
// };
// const dropDB = async () => {
//   if (mongo) {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//     await mongo.stop();
//   }
// };

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://rony:jTxRtwYnKZ8mNp0E@cluster0.8ovnfe0.mongodb.net/cannabis-connect"
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

export default setupTestDB;
