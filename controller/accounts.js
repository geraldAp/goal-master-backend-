import User from "../model/user.js";


export const getAccounts = async (req, res) => {
  try {
    const accounts = await User.find({});
    if (!accounts) {
      return res.status(400).json({ message: "no accounts found " });
    }
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteAccounts = async (req, res) => {
  try {
    const accounts = await User.find({});
    if (!accounts) {
      return res.status(400).json({ message: "no accounts found " });
    }
    await User.deleteMany();

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error("Login error:", error);;e;
    return res.status(400).json({ message: error.message });
  }
};


