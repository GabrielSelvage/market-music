const router = require("express").Router();
const User = require("../models/User.model");

const role= "";

router.get("/create-class", /*async*/ (req, res) => {
    //const allCelebrities = await Celebrity.find();
    console.log("create-class");
    res.render("classes/create-class");
});

router.get("/classes", /*async*/ (req, res) => {
    //const movies = await Movie.find().sort({ title: 1 });
    res.render("classes/class-list");
});

router.get("/teachers", /*async*/ (req, res) => {
  //const movies = await Movie.find().sort({ title: 1 });
  res.render("teachers/teachers-list");
});

router.get("/movies/:movieId", async (req, res) => {
    try {
        const movieDetail = await Movie.findById(req.params.movieId).populate("cast");
        res.render("movies/movie-details", movieDetail);
    } catch (error) {
        console.log("An error accurred", error);
    }
});

router.post("/movies/:movieId/delete", async (req, res) => {
    try {
        await Movie.findByIdAndRemove(req.params.movieId);
    } catch (error) {
        console.log("An error accurred", error);
    }
    res.redirect("/movies");
  });

  router.get("/class-edit", /*async*/ (req, res) => {
    // const movieToEdit = await Movie.findById(req.params.movieId).populate("cast");
    // const allCelebrities = await Celebrity.find().sort({ name: 1 });
    res.render("classes/class-edit" /*{ movieToEdit, allCelebrities }*/);
  });
  
  router.post("/movies/:movieId/edit", async (req, res) => {
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(req.params.movieId, {
      title,
      genre,
      plot,
      cast,
    });
    res.redirect("/movies");
  });

module.exports = router;