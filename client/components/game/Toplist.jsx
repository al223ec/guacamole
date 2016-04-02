Toplist = React.createClass({
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
    var gameId = this.props.game._id;

    Meteor.subscribe("players");
        Meteor.subscribe("banks");
    var handle = Meteor.subscribe("players");

    return {
      loading: ! handle.ready(),
      currentUser: Meteor.user(),
      players: Meteor.users.find({ _id: { $in: this.props.game.players } }).map(function(player){
        player['bank'] = Banks.findOne({ owner: player._id, gameId: gameId });
        return player;
      }),
    }
  },
  render(){
    if (this.data.loading) {
      return <LoadingSpinner />;
    }

    let { players } = this.data;
    return (<div>
        <h2>Toplist</h2>
        { this.data.players.map((player) => {
          return <BankListItem
            key={ player._id }
            bank={ player.bank }
            player={ player } />;
        }) }
    </div>
    )
  }
});
