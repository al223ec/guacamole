GameStateManager = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      errors: {}
    }
  },
  getMeteorData() {
    let query = {};
    var handle = Meteor.subscribe("games");
    // Bör börja med att endast fetcha ett game, göra en begränsning att inga nya spel kan överhuvudtaget skapas, endast ett som första version
    return {
      loading: ! handle.ready(),
      //games: Games.find({ players: Meteor.userId(), ongoing: true } ).fetch(),
      game: Games.findOne( { players: Meteor.userId(), ongoing: true } ),
      currentUser: Meteor.user()
    };
  },
  // renderGames(){
  //   return this.data.games.map((game) =>{
  //     return <Game
  //       key={ game._id }
  //       game={ game } />;
  //     });
  // },

  // Case admin
  // KickPlayer
  // PauseGame
  // StartGame
  // NewGame
  // InvitePlayer
  // StopGame
  // RestartGame
  render(){
    if (this.data.loading) {
      return <LoadingSpinner />;
    }
    
    let { game } = this.data;

    return (
      <Game key={ game._id } game={ game } />
    )
  }
});
