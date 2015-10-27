GameStateManager = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      errors: {}
    }
  },
  getMeteorData() {
    let query = {};
    Meteor.subscribe("games");
    
    return {
      games: Games.find({ players: Meteor.userId(), ongoing: true } ).fetch(),
      currentUser: Meteor.user()
    };
  },
  renderGames(){
    return this.data.games.map((game) =>{
      return <Game
        key={ game._id }
        game={ game } />;
      });
  },
  // Case admin
  // KickPlayer
  // PauseGame
  // StartGame
  // NewGame
  // InvitePlayer
  // StopGame
  // RestartGame
  render(){
    return (
      <div className="game-container">
        <h1>Games</h1>
        { this.renderGames() }
      </div>
    )
  }
});
