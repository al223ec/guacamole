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
          //
    return (
      <div className="bank-list-item">
        <div className="bank-item">
          <span> { bank ? bank.name : "No bank registered!" } </span>
          <span className="customers"> { this.data.customersCount }</span>
        </div>
        <div className="player">
          <span className="text"> { this.props.player.profile.name }</span>
        </div>
        <hr></hr>
      </div>
    );
  }
});
