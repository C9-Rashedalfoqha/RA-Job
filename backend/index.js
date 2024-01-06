const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
require("./models/dataBase");
app.use(cors());
app.use(express.json());
const userRouter = require("./routes/users");
const jobRouter = require("./routes/jobPost");
app.use("/register", userRouter);
app.use("/job", jobRouter);
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
