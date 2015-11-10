Game = React.createClass({
  propTypes: {
    game: React.PropTypes.object.isRequired
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    var gameId = this.props.game._id;
    Meteor.subscribe("players");

    return {
      currentUser: Meteor.user(),
      players: Meteor.users.find({ _id: { $in: this.props.game.players } }).map(function(player){
        player['bank'] = Banks.findOne({ owner: player._id, gameId: gameId });
        return player;
      }),
      currentUserBank: Banks.findOne({ owner: Meteor.userId(), gameId: gameId })
    }
  },
  handleSubmit(event) {
    event.preventDefault();

    var text = React.findDOMNode(this.refs.textInput).value.trim();
    // Meteor.call("addPlayer", this.props.game._id, this.data.currentUser._id)
    Meteor.call("addBank", text);
    React.findDOMNode(this.refs.textInput).value = "";
  },
  // renderBankList(){
  //   return this.data.banks.map((bank) =>{
  //     return <BankListItem
  //       key={ bank._id }
  //       bank={ bank } />;
  //     });
  // },
  // renderPlayers(){
  //   return this.data.players.map((player) =>{
  //     return <Player
  //       key={ player._id }
  //       player={ player } />;
  //     });
  // },
  renderBankPlayerList(){
    return this.data.players.map((player) => {
      return <BankListItem
        key={ player._id }
        bank={ player.bank }
        player={ player } />;
    });
  },
  render() {
    let { currentUser } = this.data;
    var url = "bank/" + this.data.currentUserBank._id;

    return (
      <div className="game">
        <span className="text"></span>
          <nav>
            <h1> { this.props.game.name } </h1>
            <ul>
              <li> Top list </li>
              <li><a href={ url }> Dashboard </a></li>
            </ul>
          </nav>
          <div className="bank-player-list">
            <table>
              <thead><th>Name</th> <th>Customers</th> <th>Player</th> <th>Total</th> <th></th> </thead>
              { this.renderBankPlayerList() }
            </table>
          </div>
      </div>
    );
  }
});
