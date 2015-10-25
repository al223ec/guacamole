BankListItem = React.createClass({
  propTypes: {
    bank: React.PropTypes.object.isRequired,
    player: React.PropTypes.object.isRequired,
  },

  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user(),
    }
  },
  render() {
    return (
      <div className="bank-list-item">
        <div className="bank-item">
          <span> { this.props.bank.name } </span>
        </div>
        <div className="player">
          <span className="text"> { this.props.player.profile.name }</span>
        </div>
      </div>
    );
  }
});
