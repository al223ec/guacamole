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
  // Update gameName
  handleSubmit(event) {
    event.preventDefault();
    var name = $(event.target).find("[name=name]").val();
    console.log("submitted")
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

    Meteor.call("updateGame", { gameId: this.props.game._id, name : name });
  },
  pauseGame: function(e){
    e.preventDefault();
    Meteor.call("pauseGame",  this.props.game._id);
  },
  resetGame: function(e){
    e.preventDefault();
    Meteor.call("resetGame",  this.props.game._id);
  },
  startGame: function(e){
    e.preventDefault();
    Meteor.call("startGame", this.props.game._id);
  },
  kickPlayer: function(playerId){

  },
  addPlayer: function(playerId){

  },
  render(){
    if (this.data.loading) {
      return <LoadingSpinner />;
    }

    let{ players } = this.data;
    let { game } = this.props;

    var gameActions;

    if(game.ongoing){
      gameActions = (<li><a href="" onClick={ this.pauseGame }> Pause Game </a></li>)
    }else{
      gameActions = (<li><a href="" onClick={ this.startGame }> Start Game</a></li>)
    }

    return (
      <div>
        <div className="game-meta">
          <h3> { game.name }</h3>
          <span className="time">time: { game.time } </span>
          <span className="ongoing">{ game.ongoing ? "Live" : "Game is paused" } </span>
        </div>

        <ul className="game-actions">
          { gameActions }
          <li> <a href="" onClick={ this.resetGame }> Reset Game</a> </li>
        </ul>

        <ul className="player-list">{
          players.map((player) => {
            return (<li>{ player.profile.name }</li>)
          })
        }
          <li><a href>Add player</a></li>
        </ul>
        <h4> Update game info </h4>
        <form onSubmit={ this.handleSubmit }>
         <AuthErrors errors={ this.state.errors } />
         <FormInput hasError={!!this.state.errors.name} name="name" type="text" label="Name" value={ game.name }/>
         <input type="submit" value="Update"/>
         </form>
      </div>)
  }
});
