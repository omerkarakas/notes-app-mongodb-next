import mongoose from "mongoose";

const connectMongoDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI || "")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

export default connectMongoDB;
