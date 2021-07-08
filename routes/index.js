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

router.get("/student",  /*requireLogin, */(req, res, next) =>{
  res.render("student-home-desktop");
});

router.get("/teacher", requireLogin, (req, res, next) => {
  res.render("teacher-home-desktop");
});

module.exports = router;
