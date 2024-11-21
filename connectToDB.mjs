import mongoose from "mongoose";

const connectToDB = async (uri) => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      process.exit(1);
    }
  };

export default connectToDB