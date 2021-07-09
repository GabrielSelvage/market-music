const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Class = require("../models/Class.model");
const fileUpload = require("../config/cloudinary");

router.get("/create-class", (req, res) => {
    res.render("classes/create-class");
});

router.post("/create-class", fileUpload.single("image"), async (req, res) => {
  try {
    let fileUrlOnCloudinary = "";
    if (req.file) {
      fileUrlOnCloudinary = req.file.path; 
    }
  const {title, description, price, about} = req.body;
    await Class.create({
      title,
      description,
      price,
      imageUrl: fileUrlOnCloudinary,
      about,
  });
  console.log("create");
  res.redirect("/classes");
} catch (error) {
  console.log("An error accurred", error);
}
});

router.get("/classes", async (req, res) => {
  const classes = await Class.find().sort({ title: 1 });
  console.log(classes);
  res.render("classes/class-list", { classes });
});



router.post("/classes/:classId/delete", async (req, res) => {
  await Class.findByIdAndRemove(req.params.classId);
  res.redirect("/classes/class-list");
});


router.get("/classes/:classId/edit", async (req, res) => {
  const classToEdit = await Class.findById(req.params.classId);//.populate("author");
  res.render("classes/class-edit", { classToEdit });
});

router.post("/classes/:classId/edit", async (req, res) => {
  try {
    // let fileUrlOnCloudinaryVideo = "";
    // if (req.file) {
    //   fileUrlOnCloudinaryVideo = req.file.path; 
    // }
    let fileUrlOnCloudinaryImage = "";
    if (req.file) {
      fileUrlOnCloudinaryImage = req.file.path; 
    }
  const {title, description, price, about} = req.body;
    await Class.create({
      title,
      description,
      price,
      //video: fileUrlOnCloudinaryVideo,
      imageUrl: fileUrlOnCloudinaryImage,
      about,
  });
  console.log("edit");
  res.redirect("/classes");
} catch (error) {
  console.log("An error accurred", error);
}
});

router.get("/class-detail", async (req, res) => {
  /*const classDetail = await Class.findById(req.params.bookId);/.populate("author");*/
  res.render("classes/class-detail"/*, classDetail*/);
});

router.get("buy-class", (req, res) => {
  res.render("buy-class");
})

module.exports = router;