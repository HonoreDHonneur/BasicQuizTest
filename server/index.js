const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const questionRouter = require("./routes/Question");

app.use(cors());
app.use(express.json());
//Routers
app.use("/question", questionRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
});
