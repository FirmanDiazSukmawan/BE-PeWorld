require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const generateToken = async (payload) => {
    const token = await jwt.sign(payload, secretKey, { expiresIn: "1h" });

    // console.log(token);
    return token;
};

const refreshToken = async (payload) => {
    const refreshToken = await jwt.sign(payload, secretKey, { expiresIn: "3h" });
    // console.log(refreshToken);
    return refreshToken;
};


module.exports = { generateToken, refreshToken };
