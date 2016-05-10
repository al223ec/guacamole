BankListItem = React.createClass({
  propTypes: {
    bank: React.PropTypes.object.isRequired,
    player: React.PropTypes.object.isRequired,
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handle = Meteor.subscribe("customers", this.props.bank._id);
    return {
      loading: ! handle.ready(),
      currentUser: Meteor.user(),
      customers: Customers.find({ bankId: this.props.bank._id }).fetch()
    }
  },
  render() {
    let { bank, player } = this.props;
    let { customers } = this.data;
    if (this.data.loading) {
      return <LoadingSpinner />;
    }

    const bankClassName = (this.data.currentUser._id == bank.owner ? "bank-list-item highlighted" : "bank-list-item");
    var bankTitle;
    var customersCountTotal = 0;
    var mortgagesTotal = 0;
    var savingsTotal = 0;
    var blancoTotal = 0;
    var positive = 0;

    customers.map((customer) =>{
      var customersCount = Math.floor(customer.customersCount);
      customersCountTotal += Math.floor(customer.customersCount);
      mortgagesTotal += customer.mortgages * customersCount;
      savingsTotal += customer.savings * customersCount;
      blancoTotal += customer.blanco * customersCount;
    });

    if(this.data.currentUser._id == bank.owner){
      bankTitle = (<div className="heading"><span>YOUR BANK: </span> <strong>{ bank.name }</strong></div>)
    }
    else{
      bankTitle = (<div className="heading"><span>{ player.profile.name }</span> <strong>{ bank ? bank.name : "No bank registered!" } </strong></div>)
    }

    return (<div className={ bankClassName }>
      { bankTitle }

      <div className="row tile_count">
        <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
          <div className="left"></div>
          <div className="right">
            <span className="count_top">
              <i className="fa fa-line-chart" aria-hidden="true"></i> List interest</span>
              <div className="count">{ bank.interest.list } % </div>
            </div>
          </div>

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
              <div className="count">{ savingsTotal/1000000 }M</div>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
            <div className="left"></div>
            <div className="right">
              <span className="count_top"><i class="fa fa-money" aria-hidden="true"></i> Total Blanco</span>
              <div className="count">{ blancoTotal/1000000 }M</div>
            </div>
          </div>
        </div>
      </div>);
    }
  });
