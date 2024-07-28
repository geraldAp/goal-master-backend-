import Task from "../../model/task.js";
import Goal from "../../model/goals.js";

const getAllTasks = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: "Invalid Id " });
    }
    // Find the goal by _id and extract its tasks
    const tasks = await Task.find({ goalId: id });
    if (!tasks) {
      return res.status(404).json({ message: "Tasks not found" });
    }
    // Return tasks
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createTask = async (req, res) => {
  const { id } = req.params;
  const { name: taskName } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ message: "Invalid Id " });
    }
    if (!taskName) {
      res.status(400).json({ message: "TaskName field is required please" });
    }
    const task = await Task.create({
      name: taskName,
      goalId: id,
    });
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json({ message: "Task not found " });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "No task found" });
    }
    await task.deleteOne();
    res.status(200).json({ message: "Task has been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  const { id, goalId } = req.params;
  const { name: taskName, completed } = req.body;
  try {
    if (!id) {
      return res.status(404).json({ message: "Invalid Id " });
    }
    const task = await Task.findById(id);
    const goal = await Goal.findById(goalId);

    if (!task) {
      return res.status(404).json({ message: `No task found with id ${id}` });
    }
    if (!goal) {
      return res.status(404).json({ message: `No goal found with id ${goalId}` });
    }
    if (taskName) {
      task.name = taskName;
    } else {
      return res.status(400).json({ message: "taskName field is required" });
    }
    if (typeof completed !== "undefined") {
      task.completed = completed;
      if (completed === false) {
        goal.isComplete = false;
      }
    }
    const result = await task.save();
    res.status(200).json([{ message: "Updated Successfully" }, result]);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the task",
      error: error.message,
    });
  }
};

export { getAllTasks, createTask, deleteTask, updateTask };
