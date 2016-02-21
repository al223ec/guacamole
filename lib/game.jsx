Game = function (doc) {
  _.extend(this, doc);
};
_.extend(Game.prototype, {
  pause: function(){
    Games.update(this._id, { $set: { ongoing: false } });
  },
  start: function(){
    Games.update(this._id, { $set: { ongoing: true } });
  },
  reset: function(){
    Games.update(game._id,  { $set: { time: 0 } });
  },
  stop: function(){

  },
  tick: function(){
    var game = this;
    var time = game.time == null || isNaN(game.time) ? 0 : game.time +=1;
    Games.update(game._id,  { $set: { time: time } });

    var banks = this.players.map((player, index, originalCursor) =>{
      return Banks.findOne({ owner: player, gameId: game._id });
    });

    var topValue = 0;
    var bottomValue;
    var middleValue = 0;

    banks.map((bank) =>{
      topValue = bank.getCompareValue() > topValue ? bank.getCompareValue() : topValue;
      bottomValue = bank.getCompareValue() < bottomValue  || !bottomValue ? bank.getCompareValue() : bottomValue;
    });

    middleValue = bottomValue + (topValue - bottomValue)/2;
    banks.map((bank) => {
      var growthRate = bank.getCompareValue() - middleValue;
      bank.addGrowthRate(growthRate);
    });
  }

  /*********** Calculate customers ***********
  1000/banks
  1 + 10 %
  2 + 8 %
  3 + 6 %
  4 + 4 %
  5 + 2 %
  6 + 1 %
  7 -
  (leader - loser)/100 * bank.value()
   21/100
  (leader - loser)/2 == middleValue

  Number of banks == 10
  Number of banks == 5
  Customers moving = 25 %
  ############## 5 12.5 %
  1 + 15 %
  2 + 5 %
  3 - 0 %
  4 - 5 %
  5 - 15 %
  */
});
