CustomersList = React.createClass({
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
    return (<div className="customers-list">
            <div className="heading">Customers list </div>
      <table>
        <thead><tr><th>RiskClass</th><th>Customers count</th> <th>Mortgage</th><th>Savings </th><th>Blanco</th></tr></thead>
        <tbody>
        { customers.map((customer) =>{
          return (<tr><td> { customer.riskClass }</td><td>{ customer.customersCount } </td><td>{ customer.mortgages } </td><td>{ customer.savings } </td><td>{ customer.blanco } </td></tr>)
        })}
      </tbody>
    </table>

    </div>);
  }
});
