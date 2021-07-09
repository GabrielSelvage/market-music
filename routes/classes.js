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
  const {title, description, price, about, level} = req.body;
  await Class.create({
      title,
      description,
      price,
      imageUrl: fileUrlOnCloudinary,
      about,
      level,
      teacher: req.session.currentUser.name,
  });
  console.log("create");
  //res.redirect(`/classes/${req.session.currentUser._id}/myclasses`);
  res.redirect("/classes")
  // await User.findByIdAndUpdate(req.session.currentUser._id, {
  //   $push: {myclasses: newClass}
  // });
  //console.log(newClass);
} catch (error) {
  console.log("An error accurred", error);
}
});

router.get("/classes", async (req, res) => {
  /*const classDetail = await Class.findById(req.session.currentClass._id)*/
  const classes = await Class.find().sort({ title: 1 });
  console.log(classes);
  res.render("classes/class-list", {classes/*,classDetail*/});
});

router.get("/myclasses", async (req, res) => {
  /*const classDetail = await Class.findById(req.session.currentClass._id)*/
  const myclass = await Class.find().sort({ title: 1 });
  console.log(myclass);
  res.render("classes/my-classes",{ myclass});
});

router.get("/classes-pay", async (req, res) => {
  let paidClasses = []
  let freeClasses = []
  classDetail = await Class.find({})
  console.log(classDetail)
  for (let i = 0; i<classDetail.length; i++){
    if (classDetail[i].price > 0){
      paidClasses.push(classDetail[i])
    } else{
      freeClasses.push(classDetail[i])
    }
  }
  res.redirect("/payed-classes", paidClasses)
});

router.get("/classes-free", async (req, res) => {
  let paidClasses = []
  let freeClasses = []
  classDetail = await Class.find({})
  console.log(classDetail)
  for (let i = 0; i<classDetail.length; i++){
    if (classDetail[i].price > 0){
      paidClasses.push(classDetail[i])
    } else{
      freeClasses.push(classDetail[i])
    }
  }
  res.redirect("/payed-classes", freeClasses);
});


router.post("/classes/:classId/delete", async (req, res) => {
  await Class.findByIdAndRemove(req.params.classId);
  res.redirect("/myclasses");
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
  //   await User.findByIdAndUpdate(req.session.currentUser._id, {
  //     $push: {favorites: req.params.moviesId}
  // })

  const {title, description, price, about} = req.body;
    await Class.findByIdAndUpdate( 
      req.params.classId,
      $push: { 
      title,
      description,
      price,
      imageUrl: fileUrlOnCloudinaryImage,
      about
      });
  console.log("edit");
  res.redirect("/classes/:classId/edit");
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