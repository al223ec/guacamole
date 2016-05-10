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

    let { game, currentUser } = this.data;

    return (
      <div>
        <div className="row top_tiles">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="tile-stats">
              <p><i className="fa fa-clock-o"></i> Time</p>
              <div className="count">{ game.time }</div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="tile-stats">
              <p><i className="fa fa-clock-o"></i> Status</p>
              <div className="count">{ game.ongoing ? "Live" : "Paused" } </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <div className="tile-stats">
              <p><i className="fa fa-line-chart"></i> stibor</p>
              <div className="count">1.5 %</div>
            </div>
          </div>
        </div>

        <section className="main-container"> { this.getGameState() } </section>
      </div>
    )
  }
});
