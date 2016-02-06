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
      game: Games.findOne( { players: Meteor.userId(), ongoing: true } ),
      currentUser: Meteor.user(),
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
  render(){
    if (this.data.loading) {
      return <LoadingSpinner />;
    }
    let { game } = this.data;
    return (
      <div className="game">
          <div className="container game-meta">
            <span className="heading"> { game.name } </span>
            <ul>
              <li>Tid: </li>
            </ul>
          </div>
          <div className="game-navigation-container">
            <div className="game-navigation">
              <ul>
                <li><span className='icon icon-briefcase'></span><a href={ "/game/" + game._id + "/start" }>Start</a></li>
                <li><a href={ "/game/" + game._id + "/interests" }>Räntor</a></li>
                <li>Avgifter</li>
                <li>Marknad</li>
                <li><a href={ "/game/" + game._id + "/toplist" }>Toplista</a></li>
              </ul>
            </div>
          </div>
          <section> { this.props.myChildComponent } </section>
      </div>
    )
  }
});
