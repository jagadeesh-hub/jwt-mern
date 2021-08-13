const router = require("express").Router();
const User = require("./userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const mailExist = await User.findOne({ email: req.body.email });
    if (mailExist) {
      return res.status(404).send("email already Exist");
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    const data = await user.save();
    res.json(data);
  } catch (error) {
    res.status(404).json(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      res.status(404).send("email not Exist");
    }
    const validpass = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validpass) {
      res.status(404).send("password is not valid");
    }

    const usertoken = jwt.sign({ email: userData.email }, "secret");
    res.header("auth", usertoken).send(usertoken);
  } catch (err) {
    res.status(404).send(err);
  }
});

const validUser = (req, res, next) => {
  const token = req.header("auth");
  res.token = token;
  next();
};

router.get("/getAll", validUser, async (req, res) => {
  jwt.verify(res.token, "secret", async (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      const data = await User.findOne().select(["-password"]);
      res.send(data);
    }
  });
});

module.exports = router;
