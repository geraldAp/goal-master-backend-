import Goal from "../../model/goals.js";
import Task from "../../model/task.js";
import cloudinary from '../../configs/cloudinaryConfig.js';
import { unlinkSync } from 'fs';


const getAllGoals = async (req, res) => {
  console.log("getting goal");
  let { page, limit, status } = req.query;
  if (!page) page = 1;
  if (!limit) limit = 10;
  const skip = (page - 1) * 10;

  const query = { userId: req.user };

  if (status === "complete") {
    query.isComplete = true;
  } else if (status === "inProgress") {
    query.isComplete = false;
  }

  try {
    const goals = await Goal.find(query).skip(skip).limit(limit);
    if (!goals) return res.status(204).json({ message: `no goals found` });
    res.status(201).json(goals);
  } catch (error) {
    console.error(error);
  }
};
const getGoal = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const goal = await Goal.findOne({ _id });
    if (!goal) {
      res.status(204).json({ message: `no goal found` });
    }
    res.status(201).json(goal);
  } catch (error) {
    console.error(error);
  }
};
const createGoal = async (req, res) => {
  try {
    const { name, priority, miniDescription, description } = req.body;
    if (!name || !priority) {
      res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user;
    if (!userId) {
      console.log("not found", userId);
    } else {
      console.log("user id exists", userId);
    }
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url; // Get the URL of the uploaded image
      // Delete the temporary file after upload
      unlinkSync(req.file.path);
    }
    const goalData = {
      name,
      priority,
      miniDescription,
      description,
      userId,
      coverImage: imageUrl, // Include the image URL
    };
    const goal = await Goal.create(goalData);
    res.status(200).json(goal);
  } catch (error) {
    console.error(error);
  }
};
const updateGoal = async (req, res) => {
  console.log("Updating goal");

  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "kindly provide an id " });
    }
    const goal = await Goal.findById(id);
    const { name, priority, miniDescription, description, isComplete } =
      req.body;
    if (!goal) {
      res.status(400).json({ message: `no goal with id ${req.body.id}` });
    }
    // doing the update
    if (name) goal.name = name;
    if (priority) goal.priority = priority;
    if (miniDescription) goal.miniDescription = miniDescription;
    if (description) goal.description = description;
    if (typeof isComplete !== "undefined") {
      goal.isComplete = isComplete;
      console.log(goal.tasks);
      if (isComplete) {
        await Task.updateMany({ goalId: id }, { completed: true });
      }
    }

    const result = await goal.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};
const deleteGoal = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!_id) {
      return res.status(400).json({ message: "kindly provide an id " });
    }
    const goal = await Goal.findOne({ _id });

    if (!goal) {
      res.status(400).json({ message: "no goal found" });
    }

    await goal.deleteOne();
    res.status(201).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error(error);
  }
};
const deleteAllGoals = async (req, res) => {
  try {
    // Use deleteMany to delete all documents from the Goal collection
    const result = await Goal.deleteMany({});

    res
      .status(200)
      .json({ message: `${result.deletedCount} goals deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export  {
  getAllGoals,
  getGoal,
  createGoal,
  deleteGoal,
  updateGoal,
  deleteAllGoals,
};
