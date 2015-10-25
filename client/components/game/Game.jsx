Game = React.createClass({
  propTypes: {
    game: React.PropTypes.object.isRequired
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    var gameId = this.props.game._id;

    return {
      currentUser: Meteor.user(),
      players: Meteor.users.find({ _id: { $in: this.props.game.players } }).map(function(player){
        player['bank'] = Banks.findOne({ owner: player._id, gameId: gameId });
        return player;
      }),
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
  renderBankPlayers(){
    return this.data.players.map((player) => {
      return <BankListItem
        key={ player._id }
        bank={ player.bank }
        player={ player } />;
    });
  },
  render() {
    let { currentUser } = this.data;
    return (
      <div className="game">
        <span className="text"></span>
          <header>
            Game: <strong> { this.props.game.name }</strong> Ongoing: { this.props.game.ongoing }
          </header>

        { this.renderBankPlayers() }
      </div>
    );
  }
});
