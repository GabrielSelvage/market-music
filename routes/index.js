const User = require("../models/User.model");
const router = require("express").Router();

function requireLogin(req, res, next){
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
}

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("01");
});

router.get("/student",  requireLogin, async (req, res, next) =>{
  const userDetail = await User.findById(req.session.currentUser._id)
  console.log(userDetail);
  res.render("student-home-desktop", {userDetail});
});

router.get("/teacher", requireLogin, async (req, res, next) => {
  const userDetail = await User.findById(req.session.currentUser._id)
  console.log(userDetail);
  res.render("teacher-home-desktop", {userDetail});
});

module.exports = router;
