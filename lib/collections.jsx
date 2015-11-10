Games = new Mongo.Collection("games");
Banks = new Mongo.Collection("banks", {
  transform: function (doc) { return new Bank(doc); }
});
Customers = new Mongo.Collection("customers");
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

  Meteor.publish("game", function(){
    if(this.userId){
      return Games.findOne({ players: this.userId, ongoing: true });
    }
  });

  Meteor.publish("banks", function(){
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

  // Meteor.publish("banksWithCustomers", function(){
  //   if(this.userId){
  //     var game = Games.findOne({ players: this.userId, ongoing: true });
  //     var banks = Banks.find({ owner: { $in: game.players }, gameId: game._id });
  //     var bankIds = banks.map(function(bank){ return bank._id });
  //
  //     return [
  //       banks,
  //       Customers.find({ bankId: { $in: bankIds }})
  //     ]
  //   }
  // });

  Meteor.publish("customers", function(bankId){
    if(this.userId){
      return Customers.find({ bankId: bankId });
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
  addCustomer(bankId){
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    const bank = Banks.findOne(bankId);
    Customers.insert({
      loan: 1500000,
      savings: 50000,
      bankId: bank._id
    });
  }
});
