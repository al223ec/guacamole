// Start the game
if (Meteor.isServer) {
  var gameTickTime = 5000;
  var games = Games.find({ ongoing: true } );

  games.map((game) =>{
    setInterval(gameTick(game), gameTickTime);
  });

  function gameTick(game){
    return Meteor.bindEnvironment(function mainGameLoop(){
      game.tick();
    });
  }
}
