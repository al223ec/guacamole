Game = function (doc) {
  _.extend(this, doc);
};
_.extend(Game.prototype, {
  tick: function(){
    var game = this;
    if(!game.ongoing){
      return
    }

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
  },
  getTime: function(){
    return this.time == null || isNaN(this.time) ? 0 : this.time;
  }
});
