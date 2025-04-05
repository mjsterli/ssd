import express from "express";
import apiRouter from "./api/apiRouter";
import twilioRouter from "./twilio/twilioRouter";
import { Request, NextFunction } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const validateInput = (req: Request, _: any, next: NextFunction) => {
  if (req.session?.ssdState && req.session?.ssdProcess) {
    console.log(
      `ssdState:ssdProcess => ${req.session.ssdState}:${req.session.ssdProcess}`
    );
  }
  next();
};

app.use("/api", apiRouter);
app.use("/twilio", validateInput, twilioRouter);

export default app;
