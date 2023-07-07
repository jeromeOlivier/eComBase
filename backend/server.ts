import express from "express";
const app = express();
const port = 5000;
import remindersRouter from "./routers/reminders";

app.use(express.json());
app.use("/reminders", remindersRouter);
app.get("/", (req, res) => res.send("Express + TypeScript Server"));
app.listen(port, () => console.log(`Server running on port: ${port}`));
