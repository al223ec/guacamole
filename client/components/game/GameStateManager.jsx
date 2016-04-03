GameStateManager = React.createClass({
  propTypes: {
  //  gameId: React.PropTypes.string.isRequired,
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
      game: Roles.userIsInRole(Meteor.userId(), 'admin') ? Games.findOne() : Games.findOne( { players: Meteor.userId() } ), //({ id: this.props.gameId }),
      currentUser: Meteor.user(),
      isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin')
    };
  },
  getGameState: function(){
    if(this.data.isAdmin){
      return <AdminDashboard />
    }else{
      switch (this.props.gameState) {
        case "toplist":
          return <Toplist game={ this.data.game } />
        case "startPage":
        default:
          return <GameStartPage gameId={ this.props.gameId } />
      }
    }
  },
  render(){
    if (this.data.loading) {
      return <LoadingSpinner />;
    }

    let { game, currentUser, isAdmin } = this.data;
    var gameNavigation;
    var gameMeta;

    if(isAdmin){
      gameNavigation = (<ul><li>Administrator</li></ul>);
    }else {
      gameNavigation = (<ul>
        <li><span className='icon icon-briefcase'></span><a href={ "/game/" + game._id + "/start" }>Start</a></li>
        <li><a href={ "/game/" + game._id + "/toplist" }>Toplist</a></li>
      </ul>);
      gameMeta = (<ul>
        <li><span className="heading"> { game.name } </span></li>
        <li> Tid: { game.time } </li>
        <li>{ game.ongoing ? "Live" : "Game is paused" }</li>
      </ul>);
    }

    return (
      <div className="game">
        <div className="container game-meta">
          { gameMeta }
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
