Game = React.createClass({
  propTypes: {
    game: React.PropTypes.object.isRequired
  },

  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },
  handleSubmit(event) {
    event.preventDefault();

    var text = React.findDOMNode(this.refs.textInput).value.trim();
    // Meteor.call("addPlayer", this.props.game._id, this.data.currentUser._id)
    Meteor.call("addBank", text);
    React.findDOMNode(this.refs.textInput).value = "";
  },
  renderPrivateBank() {
  },
  renderBanks(){
  },

  render() {
    let { currentUser } = this.data;
    let navigation;

    return (
      <div className="game">
        <span className="text">
          <header>
            Game: <strong> { this.props.game.name }</strong> Ongoing: { this.props.game.ongoing }
          </header>
        </span>

        { this.data.bank ? '' :
          <form className="new-bank" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add a bank" />
          </form>
        }
      </div>
    );
  }
});
