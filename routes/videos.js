var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log("In get all videos " +req.user.username);    
    var collection = req.db.get('videos');
    collection.find( {"owners" : {"$in": [collection.id(req.user._id)]}},function(err,videos){
            if (err) throw err;
      	res.json(videos);
    });
});

router.post('/', function(req,res) {
    var collection = req.db.get('videos');
    collection.insert({
         title:req.body.title,
         description:req.body.description,
         owners : [collection.id(req.user._id)]   
    }, function(err, video){
       if (err) throw err;

       res.json(video);
   });
}); 

router.get('/:id', function(req, res) {
    console.log('into routes-videos.js get:')
    var collection = req.db.get('videos');
    collection.findOne( { _id:req.params.id }, function(err, video){
        if (err) throw err;
        res.json(video);
      });
  }); 

router.put('/:id', function(req, res) {
    var collection = req.db.get('videos')
    collection.update({
         _id:req.params.id
    },
    {
      title:req.body.title,
      description:req.body.description
    }, function(err, video){
       if (err) throw err;
       res.json(video);
   });
 }); 

router.delete('/:id', function(req, res) {
    var collection = req.db.get('videos');
    collection.remove({_id:req.params.id}, function(err, video){
      if (err) throw err;
      res.json(video);
    });
  });
module.exports = router;
