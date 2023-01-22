import app from "./app"
import env from "./util/validateEnv"
import mongoose from "mongoose";
import scheduler from "./scheduler/scheduler";

const port = env.PORT;


mongoose.set("strictQuery", false);

mongoose.connect(env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log("Server running on port " + port);
      scheduler.start();
    });
  })
  .catch(console.error);
