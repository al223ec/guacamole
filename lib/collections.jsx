Games = new Mongo.Collection("games");
Banks = new Mongo.Collection("banks");
// Games.currentGame = function(){
//   return Games.findOne({ players: Meteor.userId(), ongoing: true });
// }
// Games.isPlayer = function(){
//   return Games.findOne({ players: Meteor.userId(), ongoing: true }) !== null;
// }

if (Meteor.isServer) {
  Meteor.publish("games", function () {
    if(this.userId){
      return Games.find({ players: this.userId, ongoing: true } );
    }
  });

  Meteor.publish("banks", function(arg){
    if(this.userId){
      var game = Games.findOne({ players: this.userId, ongoing: true });
      return Banks.find({ owner: { $in: game.players }, gameId: game._id });
    }
  });

  Meteor.publish("players", function(){
    if(this.userId){
      var game = Games.findOne({ players: this.userId, ongoing: true });
      return Meteor.users.find({ _id: { $in: game.players }, roles: "player" });
    }
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
