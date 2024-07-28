const express = require("express");
const router = express.Router();
const { User } = require("../sequelize");
const Authorization = require("../middleware/authorization");

router.post("/insert", Authorization, async (req, res) => {
  const { fname, lname, email } = req.body;
  try {
    const user = await User.create({ fname, lname, email });
    console.log("Data inserted");
    return res.status(200).json({ msg: "Data inserted", user });
  } catch (error) {
    console.log("error while inserting data");
    return res.status(500).json({ msg: "Erro while inserting" });
  }
});

router.get("/select", async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length == 0) {
      console.log("No users found");
      return res.status(404).json({ msg: "No users found" });
    }

    return res.status(200).json({ msg: "Datas", users });
  } catch (error) {
    console.log("Error while select");
    return res.status(500).json({ msg: "Error while select" });
  }
});

router.get("/select/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      console.log(`no user found with id ${id}`);
      return res.status(404).json({ msg: `no users found with id ${id}` });
    }

    return res.status(200).json({ msg: `User selected by id ${id}`, user });
  } catch (error) {
    console.log("Error while select");
    return res.status(500).json({ msg: "Error while select" });
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      console.log(`no user found with id ${id}`);
      return res.status(404).json({ msg: `no users found with id ${id}` });
    }

    await User.update(updates, {
      where: { id: id },
    });

    const updatedUser = await User.findByPk(id);

    return res.status(200).json({ msg: "Updated sucessfully", updatedUser });
  } catch (error) {
    console.log("Error while update");
    return res.status(500).json({ msg: "Error while update" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      console.log(`no user found with id ${id}`);
      return res.status(404).json({ msg: `no users found with id ${id}` });
    }

    const deleted = await user.destroy();
    return res.status(200).json({ msg: "Deleted sucessfully", deleted });
  } catch (error) {
    console.log("Error while delete");
    return res.status(500).json({ msg: "Error while delete" });
  }
});

module.exports = router;
