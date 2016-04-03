Games = new Mongo.Collection("games", {
  transform: function transformGame (doc) { return new Game(doc); }
});

Banks = new Mongo.Collection("banks", {
  transform: function transformBank (doc) { return new Bank(doc); }
});

Customers = new Mongo.Collection("customers");
// ProfitAndLoss = new Mongo.Collection("profitAndLoss");

if (Meteor.isServer) {
  Meteor.publish("games", function () {
    if(this.userId){
      return Roles.userIsInRole(this.userId, 'admin') ? Games.find({}) : Games.find({ players: this.userId } );
    }
  });

  Meteor.publish("banks", function(){
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    if(Roles.userIsInRole(this.userId, 'player')){
      var game = Games.findOne({ players: this.userId });
    }else {
      var game = Games.findOne({})
    }

    if(game != null){
      return Banks.find({ owner: { $in: game.players }, gameId: game._id });
    }
  });

  Meteor.publish("players", function(){
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    if(Roles.userIsInRole(this.userId, 'player')){
      var game = Games.findOne({ players: this.userId });
    }else{
      var game = Games.findOne({})
    }

    if(game != null){
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
  updateBank(clientBank){
    var bank = Banks.findOne(clientBank.bankId);
    if ( bank.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Banks.update(clientBank.bankId,  { $set: { interest: clientBank.interest, name: clientBank.name } });
  },
  updateGame(clientGame){
    if (! Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin') ) {
      throw new Meteor.Error("not-authorized");
    }

    Games.update(clientGame.gameId,  { $set: { name: clientGame.name } });
  },
/*  addCustomer(bankId){
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    const bank = Banks.findOne(bankId);
    Customers.insert({
      loan: 1500000,
      savings: 50000,
      bankId: bank._id
    });
  },*/
  resetGame(gameId){
    if (! Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin') ) {
      throw new Meteor.Error("not-authorized");
    }

    game = Games.findOne(gameId)
    game.players.map((player, index, originalCursor) =>{
      Banks.update(Banks.findOne({ owner: player, gameId: game._id })._id, { $set: { customersCount: 100, growthRate: 0, profitAndLosses: [] }});
    });
    
    Games.update(game._id,  { $set: { time: 0, ongoing: false } });
    // game.reset();
  },
  pauseGame(gameId){
    if (! Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin') ) {
      throw new Meteor.Error("not-authorized");
    }
    Games.update(gameId, { $set: { ongoing: false } });
  },
  startGame(gameId){
    if (! Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin') ) {
      throw new Meteor.Error("not-authorized");
    }
    Games.update(gameId, { $set: { ongoing: true } });
  }
});

/*
isPlayer(userId){
  return Games.findOne({ players: {$elemMatch: {userId: userId() } }, ongoing:true }) !== null
},
addPlayer(gameId, userId){
  Games.update(gameId, { $push: { players: userId }});
},
*/
