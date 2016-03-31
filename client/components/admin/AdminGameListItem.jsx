AdminGameListItem = React.createClass({
  propTypes: {
    game: React.PropTypes.object.isRequired,
  },
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      errors: {}
    }
  },
  getMeteorData() {
    var handle = Meteor.subscribe("players");
    return {
      loading: ! handle.ready(),
      players: Meteor.users.find({ _id: { $in: this.props.game.players } }).fetch()
    };
  },
  // KickPlayer
  handleSubmit(event) {
    event.preventDefault();
    var name = $(event.target).find("[name=name]").val();

    var errors = {};

    if (!name) {
      errors.name = "Name is required"
    }

    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      return;
    }
  },
  pauseGame: function(gameId){
    return function(e){
      e.preventDefault();
      console.log("Pause game", gameId)
    }
  },
  render(){
    if (this.data.loading) {
      return <LoadingSpinner />;
    }

    let{ players } = this.data;
    let { game } = this.props;

    return (
      <div>
        <span> { game.name } time: { game.time } { game.ongoing ? "Live" : "Game is paused" } </span>
        <a href onClick={ this.pauseGame(game._id)}> Pause Game </a>

        <ul>{
          players.map((player) => {
            return (<li>{ player.profile.name } <a href>Kick</a></li>)
          })
        }
          <li><a href>Add player</a></li>
        </ul>

        <form onSubmit={ this.handleSubmit }>
         <AuthErrors errors={ this.state.errors } />
         <FormInput hasError={!!this.state.errors.name} name="name" type="text" label="Name" value={ game.name }/>
         <input type="submit" value="Update"/>
         </form>
      </div>
    )
  }
});
