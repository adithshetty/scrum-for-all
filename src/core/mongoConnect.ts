import { connect, connection } from "mongoose";

export const connectDB = async (mongoURI: string) => {
  try {
    connection.on("connected", () => console.log("MongoDB connected"));
    connection.on("open", () => console.log("MongoDB open"));
    connection.on("disconnected", () => console.log("MongoDB disconnected"));
    connection.on("reconnected", () => console.log("MongoDB reconnected"));
    connection.on("disconnecting", () => console.log("MongoDB disconnecting"));
    connection.on("close", () => console.log("MongoDB close"));

    await connect(mongoURI);
  } catch (error) {
    console.error("MongoDB connection failed", error);
  }
};
