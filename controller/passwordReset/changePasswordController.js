import User from '../../model/user.js';
import { comparePassword, encryptPassword } from '../../helpers/passwordHelpers.js';

// Controller for changing the password
const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    // Check if all fields are provided
    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "This user does not exist" });
    }

    // Compare the old password with the stored password
    const isPasswordMatch = await comparePassword(oldPassword, user.password);

    // If passwords do not match, send an error response
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Encrypt the new password
    const hashedPassword = await encryptPassword(newPassword);

    // Update the user's password and save
    user.password = hashedPassword;
    await user.save();

    // Send a success response
    res.status(201).json({ message: "Password updated successfully" });
  } catch (error) {
    // Handle any errors
    res.status(400).json({ message: error.message });
  }
};

export  { changePassword };
