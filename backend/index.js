const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3103;
require("./models/dataBase");
app.use(cors());
app.use(express.json());
const userRouter = require("./routes/users");
const jobRouter = require("./routes/jobPost");
const roleRouter = require("./routes/role");
const postRouter = require("./routes/post");
app.use("/register", userRouter);
app.use("/job", jobRouter);
app.use("/role", roleRouter);
app.use("/post", postRouter);
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
