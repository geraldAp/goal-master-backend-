import { sign } from 'jsonwebtoken';


const generateAccessToken = (userId) => {
  return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (userId) => {
  return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn:'15d'
  });
};


export default {generateAccessToken, generateRefreshToken}