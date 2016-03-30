GameStateManager = React.createClass({
  propTypes: {
    gameId: React.PropTypes.string.isRequired,
    gameState: React.PropTypes.string.isRequired
  },
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
      game: Roles.userIsInRole(Meteor.userId(), 'admin') ? Games.findOne({ ongoing: true }) : Games.findOne( { players: Meteor.userId(), ongoing: true } ), //({ id: this.props.gameId }),
      currentUser: Meteor.user(),
      isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin')
      // currentUserBank: Banks.findOne({ owner: Meteor.userId(), gameId: gameId })
    };
  },
  // Case admin
  // KickPlayer
  // PauseGame
  // StartGame
  // NewGame
  // InvitePlayer
  // StopGame
  // RestartGame
  // <Game key={ game._id } game={ game } />
  getGameState: function(){
    switch (this.props.gameState) {
      case "toplist":
        return <Toplist game={ this.data.game } />
      case "startPage":
        return <GameStartPage gameId={ this.props.gameId } />
      default:

    }
  },
  render(){
    if (this.data.loading) {
      return <LoadingSpinner />;
    }

    let { game, currentUser, isAdmin } = this.data;

    if(isAdmin){
      var gameNavigation = (<ul><li>Pause/start </li><li>Reset</li><li>Add player</li></ul>)
    }else {
      var gameNavigation = (<ul>
       <li><span className='icon icon-briefcase'></span><a href={ "/game/" + game._id + "/start" }>Start</a></li>
       <li><a href={ "/game/" + game._id + "/interests" }>Räntor</a></li>
       <li>Avgifter</li>
       <li>Marknad</li>
       <li><a href={ "/game/" + game._id + "/toplist" }>Toplista</a></li>
     </ul>)
    }
    return (
      <div className="game">
          <div className="container game-meta">
            <span className="heading"> { game.name } </span>
            <ul>
              <li>Tid: { game.time } </li>
              <li>{ game.ongoing ? "Live" : "Game is paused" }</li>
            </ul>
          </div>

          <div className="game-navigation-container">
            <div className="game-navigation">
              { gameNavigation }
            </div>
          </div>
          <section> { this.getGameState() } </section>
      </div>
    )
  }
});
