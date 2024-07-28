import { Router } from "express";
import { getAllGoals, createGoal, getGoal, updateGoal, deleteGoal, deleteAllGoals } from "../controller/goals/goalController.js";
import { getAllTasks, createTask, deleteTask, updateTask } from "../controller/goals/tasksController.js";
import authMiddleWare from "../middleware/verifyJwt.js";
import { upload } from "../helpers/imageUploader.js";
const router = Router();

// Apply middleware to all routes
router.use(authMiddleWare);

// Goal routes
router.route("/").get(getAllGoals).post(upload.single("image"), createGoal);
router.route("/:id").get(getGoal).put(updateGoal).delete(deleteGoal);
// If deleteAllGoals is needed, add the route below
router.route("/").delete(deleteAllGoals);

// Task routes
router.route("/:id/tasks").get(getAllTasks).post(createTask);
router.delete("/:id/task", deleteTask);
router.put("/:id/task/:goalId", updateTask);
export default router;
