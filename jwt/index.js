const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./userRouter");
const morgan = require("morgan");
const cors = require("cors");
require("./prod")(app);
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.use("/api", userRouter);

mongoose.connect(
  " mongodb+srv://mongo:9652266412@auth.jqxzg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",

  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("mongodb is connected successfully");
  }
);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server is started at ", PORT));
