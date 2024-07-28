import { hash, compare } from "bcrypt";

export const encryptPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const comparePassword = async (password, dbPassword) => {
  try {
    const isPasswordValid = await compare(password, dbPassword);
    return isPasswordValid;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};


