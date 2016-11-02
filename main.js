var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

// Routes
var router = express.Router();

router.get('/images', function(req, res) {
  Image.find({}, function(err, images) {
    if (err) throw err;
    res.json(images);
  });
});

router.get('/search', function(req, res) {
  var q = req.query.q;
  console.log("Search with: " + q);
  Image.find({ $text: { $search: q } }, function(err, doc) {
    if(err) throw err;
    console.log(doc.length + " hits!");
    res.json(doc);
  });
});

router.get('/refresh', function(req, res) {
  var request = require('request');
  var options = {
    url: 'https://api.imgur.com/3/gallery/hot/viral/0.json',
    headers: {
      'Authorization': process.env.IMGUR_ID
    }
  };

  function callback(err, res, body) {
    if (err) {
      return console.error("error: ", err);
    };

    Image.remove({}, function(err) {
      if(err) throw err;
      console.log('Image collection deleted');
    });

    var data = JSON.parse(body).data;
    for (var i = 0; i < data.length; i++) {
      var img = data[i];
      var new_img = new Image({
          id: img.id,
          title: img.title,
          description: img.description,
          datetime: img.datetime,
          type: img.type,
          animated: img.animated,
          width: img.width,
          height: img.height,
          size: img.size,
          views: img.views,
          bandwidth: img.bandwidth,
          deletehash: img.deletehash,
          name: img.name,
          section: img.section,
          link: img.link,
          gifv: img.gifv,
          mp4: img.mp4,
          mp4_size: img.mp4_size,
          looping: img.looping,
          favorite: img.favorite,
          nsfw: img.nsfw,
          vote: img.vote,
          in_gallery: img.in_gallery
      });
      new_img.save(function(err) {
        if(err) throw err;
      });
    };
    console.log(i + ' images saved');

  };
  request(options, callback);
  res.json({'message': 'Database updated'});
});

// Prefix /api
app.use('/api', router);

app.listen(port);
console.log('APINANIMUN on port ' + port);

// ========================================

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

var Image = require('./app/models/image');


// ========================================


