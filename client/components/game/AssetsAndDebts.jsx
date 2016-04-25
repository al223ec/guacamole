AssetsAndDebts = React.createClass({
  propTypes: {
    bank: React.PropTypes.object.isRequired,
  },
  render() {
    return (<div className="interest-incomes-list">
        <div className="heading">Interest incomes bank</div>
        <div className="assets">

          <InterestIncomesList bank={ this.props.bank } />
        </div>
        
        <div className="depts">
          <InterestExpensesList bank={ this.props.bank } />
        </div>
    </div>);
  }
});
