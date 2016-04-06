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
            <li><strong>Bank info</strong></li>
            <li><div><span className="meta">interest:</span> <strong>{ bank.interest.list } </strong></div></li>
            <li><div><span className="meta">growthRate:</span> <strong>{ bank.growthRate.riskOne },{ bank.growthRate.riskTwo },{ bank.growthRate.riskThree },{ bank.growthRate.riskFour },{ bank.growthRate.riskFive },{ bank.growthRate.riskSix }</strong></div></li>
            <li><div><span className="meta">customersCount:</span> <strong>{ bank.customersCount } </strong></div></li>
          </ul>
        </div>
        <div className="results">
          <table>
            <thead><tr><th colSpan="2">Profit and loss</th></tr></thead>
            <tbody>
              <tr>
                <td>T</td><td>C</td>
              </tr>
              { bank.profitAndLosses.map((profitAndLoss) => {
                return (<tr><td>{ profitAndLoss.time }</td> <td>{ profitAndLoss.customersCount }</td></tr>)
              })}
          </tbody>
        </table>
        </div>
      </div>);
  }
});
