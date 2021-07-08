const express = require("express");
const router = express.Router();
const Class = require("../models/Class.model");

router.get('/search', async (req, res) => {
    try {
      const {search} = req.query;
      console.log("Search", search);
      const results = await Class.find({
        username: {
          $regex: '.*' + search + '.*',
          $options: 'i'
        }
      })// .populate('tags');
      console.log('result', results);
      res.render('result/result', {
        results
        //user: req.session.currentUser
      });
    } catch (e) {
      res.render('error');
      console.log(`An error occurred ${e}`);
    }
    return;
  });

module.exports = router;