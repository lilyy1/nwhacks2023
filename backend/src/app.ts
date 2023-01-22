import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import messageRoutes from "./routes/messageRoutes";
import plantRoutes from "./routes/plantRoutes";
import threadRoutes from "./routes/threadRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import createHttpError, { isHttpError } from "http-errors";
import userRoutes from "./routes/userRoute";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/plants", plantRoutes);

app.use("/api/threads", threadRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use((req, res, next) => {
    next(Error(`No route found for ${req.method} ${req.path}`));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred"; 
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
export default app;