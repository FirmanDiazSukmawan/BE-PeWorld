require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const LoginAuth = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token tidak ada" });
    }

    const token = authToken.split(" ")[1];
    const decode = jwt.verify(token, secretKey);

    req.payload = decode;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token tidak valid" });
  }
};

const isAdmin = (req, res, next) => {
  if (req?.payload?.users?.role === 0) {
    next();
  } else
    res.json({
      message: "Halaman hanya bisa di akses oleh admin",
    });
};

const isUsers = (req, res, next) => {
  if (req?.payload?.users?.role === 1) {
    next();
  } else
    res.json({
      message: "Halaman hanya bisa di akses oleh admin",
    });
};

module.exports = {
  LoginAuth,
  isAdmin,
  isUsers,
};
