const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes");
const { noteRouter } = require("./routes/Note.route");
const { authenticate } = require("./middlewares/authenticate.middleware");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/user", userRouter);
app.use(authenticate);
app.use("/note", noteRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (err) {
    console.log(err.message);
  }

  console.log(`Server running on port ${process.env.port}`);
});
