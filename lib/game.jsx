Game = function (doc) {
  _.extend(this, doc);
};
_.extend(Game.prototype, {
  pause: function(){

  },
  start: function(){

  },
  stop: function(){

  },
  tick: function(){
    var game = this;
    var time = !game.time || isNaN(game.time) ? 0 : game.time +=1;
    Games.update(game._id,  { $set: { time: time} });

    var banks = this.players.map((player) =>{
      return Banks.findOne({ owner: player, gameId: game._id });
    });

    banks.map((bank) =>{
      console.log(bank.getCompareValue());

    });
  }

  /*********** Calculate customers ***********
  1000/banks
  1  + 10 %
  2 + 8 %
  3 + 6 %
  4 + 4 %
  5 + 2 %
  6 + 1 %
  7 -
  Number of banks == 10
  */
});
