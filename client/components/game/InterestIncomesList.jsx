InterestIncomesList = React.createClass({
  propTypes: {
    bank: React.PropTypes.object.isRequired,
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    var data = {};
    var handle = Meteor.subscribe("customers", this.props.bank._id);

    return {
      loading: ! handle.ready(),
      currentUser: Meteor.user(),
      customers: Customers.find({ bankId: this.props.bank._id }).fetch(),
    }
  },
  render() {
    let { customers } = this.data;

    if (this.data.loading) {
      return <LoadingSpinner />;
    }

    return (<div className="interest-incomes-list">
        <div className="heading">Interest incomes  bank</div>
      <table>
        <thead><tr><th>Interest income</th></tr></thead>
        <tbody>
        { customers.map((customer) =>{
          return customer.interestIncomes.map((interestIncome) => {
            return (<tr><td> { interestIncome }</td></tr>)
          })
        })}
      </tbody>
    </table>

    </div>);
  }
});
