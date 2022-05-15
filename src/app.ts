import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import todoRoutes from "./routes/todos";
import logger from "./lib/log/logger";
import applicationLogger from "./lib/log/applicationLogger";
import accessLogger from "./lib/log/accessLogger";

const PORT = 3000;
const app = express();

// express settings
app.use(json());

// access log
app.use(accessLogger());

// dynamic resource rooting
app.use("/todos", todoRoutes);

// error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
  next(err);
});

// application log
app.use(applicationLogger());

app.listen(PORT, () => {
  logger.application.info(`Application listenning at ${PORT}`);
});
