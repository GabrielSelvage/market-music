const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Class = require("../models/Class.model");
const fileUpload = require("../config/cloudinary");

router.get("/teachers", async (req, res) => {
    const teachers = await Class.find({role: "Teacher"}).sort({ title: 1 });
    console.log(teachers);
    res.render("teachers/teachers-list", {teachers});
});

module.exports = router;