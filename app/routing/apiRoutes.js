var friendsData = require("../data/friends");
var fs = require("fs");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    // compare req.body with each of friendsData
    // var difference = 0;
    // friendsData.forEach(function(item, index) {
    //   difference += Math.abs(req.body.scores[index] - item.scores[index]);
    //   // item.scores is array to compare with req.body.scores
    // });


    friendsData.push(req.body);
    var updatedFriendsData = "var friendsArray = ";
    updatedFriendsData += JSON.stringify(friendsData);
    updatedFriendsData += ";\n\n";
    updatedFriendsData += "module.exports = friendsArray;";
    fs.writeFile(__dirname + "/../data/friends.js", updatedFriendsData, function(err) {
      if (err) throw err;
      res.json(req.body);
    });
    
  });

}