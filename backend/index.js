// backend/index.js
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.use("/api/v1", rootRouter);
app.use("/api/v1/user", userRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
