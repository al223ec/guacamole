// Start the game
/*if (Meteor.isServer) {
  var gameTickTime = 5000;
  var games = Games.find();

  games.map((game) =>{
    setInterval(gameTick(game), gameTickTime);
  });

  function gameTick(game){
    return Meteor.bindEnvironment(function mainGameLoop(){
      console.log("gameTick");
      game.tick();
    });
  }
}*/
Meteor.startup(function () {
  update();
  console.log("Meteor startup");
});

function update() {
  var gameTickTime = 5000;

  var games = Games.find();
  games.map((game) =>{
    game.tick();
  });

  Meteor.setTimeout(update, gameTickTime);
}
