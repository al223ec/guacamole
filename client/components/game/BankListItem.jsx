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

        <div className="row tile_count">
          <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
            <div className="left"></div>
            <div className="right">
              <span className="count_top">
                <i class="fa fa-line-chart" aria-hidden="true"></i> List interest</span>
              <div className="count">{ bank.interest.list } % </div>
            </div>
          </div>

          <BankCustomersList bank={ bank } />
        </div>

      </div>);
  }
});
