import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import plantRoutes from "./routes/plantRoutes";

const app = express();

app.use(express.json());

app.use("/api/plants", plantRoutes);

app.use((req, res, next) => {
    next(Error("Endpoint not found"));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if(error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
});

export default app;