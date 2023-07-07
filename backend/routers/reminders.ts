import { Router } from "express";
import CreateReminderDto from "../dtos/create-reminder";

const router = Router();

router.get("/", (req, res) => res.send("List of reminders!"));
router.post("/", (req, res) => {
  const { title, body, isComplete } = req.body as CreateReminderDto;
  const reminder = { id: Date.now(), title, body, isComplete: false };
  res.json({ title, body, isComplete });
});

export default router;
