var friendsData = require("../data/friends");
var fs = require("fs");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    var message = "";
    var friends = [];
    var smallestDifference = 50;

    friendsData.forEach(function(item, index) {

      var difference = 0;

      for (var i = 0; i < 10; i++) {
        var yourScore = parseInt(req.body.scores[i]);
        var theirScore = parseInt(item.scores[i]);
        if (yourScore !== 0 && theirScore !== 0) {
          difference += Math.abs(yourScore - theirScore);
          console.log("you = " + yourScore + " them = " + theirScore + " and diff = " + Math.abs(yourScore - theirScore));
        }
      }

      var friend = {
        name: item.name,
        photo: item.photo,
        difference: difference
      }
      friends.push(friend);

      message += item.name + " has a difference of " + difference + " from you.\n\n";
      smallestDifference = difference < smallestDifference ? difference : smallestDifference;

    });

    var bestFriend = friends.find(bestFriend => bestFriend.difference === smallestDifference);
    message += "Your new best friend is " + bestFriend.name + " and here's a photo: " + bestFriend.photo;
    console.log(message);

    friendsData.push(req.body);
    var updatedFriendsData = "var friendsArray = " + JSON.stringify(friendsData) + ";\n\nmodule.exports = friendsArray;";

    fs.writeFile(__dirname + "/../data/friends.js", updatedFriendsData, function(err) {
      if (err) throw err;
      res.json(bestFriend);
    });
    
  });

}