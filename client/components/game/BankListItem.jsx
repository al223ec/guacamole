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

    return (<div className={ bankClassName }>
        <div className="heading">
          player: <strong>{ player.profile.name }</strong> bank: <strong>{ bank ? bank.name : "No bank registered!" } </strong>
        </div>

        <div className="info">
          <ul>
            <li>interest: <strong>{ bank.interest } </strong></li>
            <li>growthRate: <strong>{ bank.growthRate } </strong></li>
            <li>customersCount: <strong>{ bank.customersCount } </strong></li>
          </ul>
        </div>
        <div className="results">
          { bank.profitAndLoss() }
        </div>
      </div>);
  }
});
