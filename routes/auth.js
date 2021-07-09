const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const fileUpload = require("../config/cloudinary");

function requireLogin(req, res, next){
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
}

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
    const {username, password, role} = req.body;
  
    if(!username === "" || !password === "") {
      res.render('auth/login', {
        errorMessage: "Fill username and password",
      });
      return;
    }
  
      const user = await User.findOne({ username });
      if (!user) {
        res.render('auth/login', {
          errorMessage: "Invalid login",
        });
        return;
      }
  
      //check for password
      if (bcrypt.compareSync(password, user.password)) {
        //Passwords match
        //Initializing the session with the current user
        req.session.currentUser = user;
        if (user.role){
          res.redirect('/teacher');
        } else{
          res.redirect('/student');
        }
      }else{
        //Password don't match
        res.render("auth/login", {
          errorMessage: "Invalid login",
        });
      }
  });

router.get("/signup-student", (req, res) => {
  res.render("auth/signup-student");
});

router.post("/signup-student", fileUpload.single("image"), async (req, res) => {
  let fileUrlOnCloudinary = "";
  if (req.file) {
    fileUrlOnCloudinary = req.file.path; 
  }

  const {username, email, password} = req.body;

  //check if username and password are filled in
  if (username === '' || password === '') {
    res.render("auth/signup-student", {errorMessage: "Fill username and password"});
    return;
  }

  //check for password strenght
  let myRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (myRegex.test(password) === false) {
    res.render("auth/signup-student", {
      errorMessage: "Password is too weak",
    });
    return;
  }

  // check if username already exists
  const user = await User.findOne({username: username});
  if (user !==null) {
    res.render("auth/signup-student", {errorMessage: "Username already exists"});
    return;
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  await User.create({
    username: username,
    email: email,
    password: hashedPassword,
    imageUrl: fileUrlOnCloudinary,
  });
  res.redirect("/student");
});

router.get("/beteacher", requireLogin, (req, res)=>{
  res.render("auth/beteacher");
})

router.post("/beteacher", async (req, res) => {
  const {name, description, instrument}= req.body;
  console.log("Current user",req.session.currentUser._id)
  console.log("Name, description, instrument",name, description, instrument)
  await User.findByIdAndUpdate(req.session.currentUser._id,
    {description: description,
    instrument: instrument,
    name: name,
    role: "teacher",
  });
  console.log(name, description, instrument)
  res.redirect("/teacher");
});

router.get("/signup-teacher", (req, res) => {
  res.render("auth/signup-teacher");
});

router.post("/signup-teacher", fileUpload.single("image"), async (req, res) => {
  let fileUrlOnCloudinary = "";
  if (req.file) {
    fileUrlOnCloudinary = req.file.path; 
  }

  const {username, email, password, description, instrument, dateBorn, role} = req.body;

  //check if username and password are filled in
  if (username === '' || password === '') {
    res.render("auth/signup-teacher", {errorMessage: "Fill username and password"});
    return;
  }

  //check for password strenght
  let myRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (myRegex.test(password) === false) {
    res.render("auth/signup-teacher", {
      errorMessage: "Password is too weak",
    });
    return;
  }

  // check if username already exists
  const user = await User.findOne({username: username});
  if (user !==null) {
    res.render("auth/signup-teacher", {errorMessage: "Username already exists"});
    return;
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  
  await User.create({
    username: username,
    email: email,
    password: hashedPassword,
    imageUrl: fileUrlOnCloudinary,
    description: description,
    instrument: instrument,
    role: "teacher",
});
  res.redirect("/teacher");
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
