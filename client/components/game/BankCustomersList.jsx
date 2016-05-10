BankCustomersList = React.createClass({
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

    var customersCountTotal = 0;
    var mortgagesTotal = 0;
    var savingsTotal = 0;
    var blancoTotal = 0;
    var positive = 0;

    customers.map((customer) =>{
      customersCountTotal += Math.floor(customer.customersCount);
      mortgagesTotal += customer.mortgages * Math.floor(customer.customersCount);
      savingsTotal += customer.savings * Math.round(customer.customersCount);
      blancoTotal += customer.blanco * Math.round(customer.customersCount);
    });


    return (<div>
      <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
            <div className="left"></div>
            <div className="right">
          <span className="count_top"><i className="fa fa-user"></i> Total Customers</span>
          <div className="count">{ customersCountTotal }</div>
        </div>
      </div>
    <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
      <div className="left"></div>
      <div className="right">
        <span className="count_top"><i class="fa fa-money" aria-hidden="true"></i> Total Mortgages</span>
        <div className="count green">{ mortgagesTotal/1000000 }M</div>
      </div>
    </div>
    <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
      <div className="left"></div>
      <div className="right">
        <span className="count_top"><i class="fa fa-money" aria-hidden="true"></i>Total Savings</span>
        <div className="count">{ savingsTotal/1000 }K</div>
      </div>
    </div>
    <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
      <div className="left"></div>
      <div className="right">
        <span className="count_top"><i class="fa fa-money" aria-hidden="true"></i> Total Blanco</span>
        <div className="count">{ blancoTotal/1000 }K</div>
      </div>
    </div>
    </div>);
  }
});
