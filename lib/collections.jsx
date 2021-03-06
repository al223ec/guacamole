Games = new Mongo.Collection("games", {
  transform: function transformGame (doc) { return new Game(doc); }
});

Banks = new Mongo.Collection("banks", {
  transform: function transformBank (doc) { return new Bank(doc); }
});

InterestIncomes = new Mongo.Collection("interest_incomes", {
  transform: function transformInterestIncome (doc) { return new InterestIncome(doc); }
});

InterestExpenses = new Mongo.Collection("interest_expenses", {
  transform: function transformInterestExpense (doc) { return new InterestExpense(doc); }
});

SurplusIncomes = new Mongo.Collection("surplus_incomes", {
  transform: function transformSurplusIncome(doc) { return new SurplusIncome(doc); }
});

ExternalFoundingExpenses = new Mongo.Collection("external_founding_expenses", {
  transform: function transformExternalFoundingExpenses(doc) { return new ExternalFoundingExpense(doc); }
});

BalanceSheets = new Mongo.Collection("balance_sheets", {
  transform: function transformBalanceSheets(doc) { return new BalanceSheet(doc); }
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

  Meteor.publish("interest_incomes", function(bankId){
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    return InterestIncomes.find({ bankId: bankId });
  });

  Meteor.publish("interest_expenses", function(bankId){
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    return InterestExpenses.find({ bankId: bankId });
  });

  Meteor.publish("balance_sheets", function(bankId){
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    return BalanceSheets.find({ bankId: bankId });
  });

  Meteor.publish("customers", function(bankId){
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    return Customers.find({ bankId: bankId });
  });
}

Meteor.methods({
  updateBank(clientBank){
    var bank = Banks.findOne(clientBank.bankId);
    if (!bank || bank.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    if(!clientBank.name || !clientBank.interest || !clientBank.blancoInterest){
      throw new Meteor.Error("bank-is-not-valid");
    }
    Banks.update(clientBank.bankId,  { $set: { interest: clientBank.interest, name: clientBank.name } });
  },
  updateGame(clientGame){
    if (! Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin') ) {
      throw new Meteor.Error("not-authorized");
    }
    if(!clientGame.name){
      throw new Meteor.Error("game-is-not-valid");
    }

    Games.update(clientGame.gameId,  { $set: { name: clientGame.name } });
  },
  resetGame(gameId){
    if (! Meteor.userId() || !Roles.userIsInRole(Meteor.userId(), 'admin') ) {
      throw new Meteor.Error("not-authorized");
    }

    game = Games.findOne(gameId)
    game.players.map((player, index, originalCursor) =>{
      bank = Banks.findOne({ owner: player, gameId: game._id });
      Customers.update(
        { bankId: bank._id, customersCount: { $ne: 2500 } },
        { $set: { customersCount: 2500 }},
        { upsert: true, multi: true });

      Banks.update(bank._id, { $set: { profitAndLosses: [] }});
      BalanceSheets.remove({ bankId: bank._id });
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
