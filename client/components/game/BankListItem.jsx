BankListItem = React.createClass({
  propTypes: {
    player: React.PropTypes.object.isRequired,
    bank: React.PropTypes.object.isRequired,
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    var data = {};
    var bankId = this.props.bank._id;
    var handle = Meteor.subscribe('customers', bankId);
    if(handle.ready()) {
      data.customers = Customers.find({ bankId: bankId}).fetch();
      data.customersCount = Customers.find({ bankId: bankId }).count();
    }
    data.currentUser =  Meteor.user();
    return data;
  },
  render() {
    let { bank } = this.props;
    const bankClassName = (this.data.currentUser._id == bank.owner ? "bank-list-item highlighted" : "bank-list-item");

    return (
      <div className={ bankClassName }>
        <div className="bank-item" >
          <span> { bank ? bank.name : "No bank registered!" } </span>
          <span className="customers"> { this.data.customersCount }</span>
        </div>
        <div className="player">
          <span className="text"> { this.props.player.profile.name }</span>
        </div>
        <a href > Add Customer </a>
        <hr></hr>
      </div>
    );
  }
});
