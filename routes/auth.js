const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const fileUpload = require("../config/cloudinary");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/signup-student", (req, res) => {
  res.render("auth/signup-student");
});

router.get("/signup-teacher", (req, res) => {
  res.render("auth/signup-teacher");
});

router.post("/users/create", async (req, res) => {
    if (role === student) {
        try {
            const { username, email, password} = req.body;
            await User.create({
                username,
                email,
                password,
              });
              res.redirect("/");
        } catch (error) {
            console.log("An error accurred", error);
        }
    }else if(role === teacher){
        try {
            const { username, email, password, role} = req.body;
            await User.create({
                username,
                email,
                password,
                role,
              });
              res.redirect("/signup");
        } catch (error) {
            console.log("An error accurred", error);
        }
    }
});

router.post("/signup", fileUpload.single("image"), async (req, res) => {
  let fileUrlOnCloudinary = "";
  if (req.file) {
    fileUrlOnCloudinary = req.file.path; 
  }

  const {username, email, password} = req.body;

  //check if username and password are filled in
  if (username === '' || password === '') {
    res.render("auth/signup", {errorMessage: "Fill username and password"});
    return;
  }

  //check for password strenght
  let myRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (myRegex.test(password) === false) {
    res.render("auth/signup", {
      errorMessage: "Password is too weak",
    });
    return;
  }

  // check if username already exists
  const user = await User.findOne({username: username});
  if (user !==null) {
    res.render("auth/signup", {errorMessage: "Username already exists"});
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
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.render('auth/login');
});

router.post("/login", async (req, res) => {
  const {username, password} = req.body;

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
      res.redirect('/');
    }else{
      //Password don't match
      res.render("auth/login", {
        errorMessage: "Invalid login",
      });
    }
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
})

router.get("/users", async(req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.render("auth/user-list", { users });
})

module.exports = router;
