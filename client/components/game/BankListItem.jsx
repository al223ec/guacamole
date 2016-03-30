BankListItem = React.createClass({
  propTypes: {
    bank: React.PropTypes.object.isRequired,
    player: React.PropTypes.object.isRequired,
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    var data = {};
    data.currentUser =  Meteor.user();
    return data;
  },
  render() {
    let { bank, player } = this.props;
    const bankClassName = (this.data.currentUser._id == bank.owner ? "bank-list-item highlighted" : "bank-list-item");

    return (<div>
        <span>player: { player.profile.name } bank: { bank ? bank.name : "No bank registered!" } </span>
        <ul>
          <li>interest: { bank.interest }</li>
          <li>growthRate: { bank.growthRate }</li>
          <li>customersCount: { bank.customersCount }</li>
        </ul>
      </div>);
  }
});
