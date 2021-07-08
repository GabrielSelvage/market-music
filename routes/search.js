const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const fileUpload = require("../config/cloudinary");

router.get('/search', async (req, res) => {
    try {
      const search = req.query.search;
      console.log('keyword', search);
      const results = await User.find({
        title: {
          $regex: '.*' + search + '.*',
          $options: 'i'
        }
      }).populate('tags');
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