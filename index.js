const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const xssclean = require("xss-clean");
const mainRouter = require("./src/router/mainRouter");

const PORT = 3002;
app.use(cors());
app.use(helmet());
app.use(xssclean());
app.use(bodyParser.json());
app.use(mainRouter);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server ready to use",
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
