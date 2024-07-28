const { User } = require("../sequelize");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;
console.log("JWT_SECRET", JWT_SECRET);

router.post("/authenticate", async (req, res) => {
  try {
    const { fname, email, password } = req.body;

    const checkData = await User.findOne({ where: { fname } });
    console.log("checkData", checkData);
    if (checkData) {
      res.status(500).json({ msg: "fname is already in use" });
    }

    const hashedPass = await bcrypt.hash(password, 12);
    console.log("hashedPass", hashedPass);

    const newUser = await User.create({
      fname: fname,
      email: email,
      password: hashedPass,
    });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1h" });

    return res.status(201).json({
      msg: "User Successfully created",
      userName: fname,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "An error occured" });
  }
});

module.exports = router;
