Games = new Mongo.Collection("games");

// Games.currentGame = function(){
//   return Games.findOne({ players: Meteor.userId(), ongoing: true });
// }
// Games.isPlayer = function(){
//   return Games.findOne({ players: Meteor.userId(), ongoing: true }) !== null;
// }

if (Meteor.isServer) {
  Meteor.publish("games", function () {
    return Games.find({ players: this.userId, ongoing: true } );
  });
}

Meteor.methods({
  getBanks(){
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    //return Banks.find({ game: Games.currentGame()._id });
  },
  isPlayer(userId){
    return Games.findOne({ players: {$elemMatch: {userId: userId() } }, ongoing:true }) !== null
  },
  addPlayer(gameId, userId){
    Games.update(gameId, { $push: { players: userId }});
  },
});
