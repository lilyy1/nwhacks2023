import app from "./app"
import mongoose from "mongoose";


const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log("Server running on port " + port);
    });
  })
  .catch(console.error);
