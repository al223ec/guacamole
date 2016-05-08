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
        <div className="row tile_count">
          <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
            <div className="left"></div>
            <div className="right">
              <span className="count_top"><i className="fa fa-user"></i> Total Users</span>
              <div className="count">2500</div>
              <span className="count_bottom"><i className="green">4% </i> From last Week</span>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
            <div className="left"></div>
            <div className="right">
              <span className="count_top"><i className="fa fa-clock-o"></i> Average Time</span>
              <div className="count">123.50</div>
              <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>3% </i> From last Week</span>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
            <div className="left"></div>
            <div className="right">
              <span className="count_top"><i className="fa fa-user"></i> Total Males</span>
              <div className="count green">2,500</div>
              <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>34% </i> From last Week</span>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
            <div className="left"></div>
            <div className="right">
              <span className="count_top"><i className="fa fa-user"></i> Total Females</span>
              <div className="count">4,567</div>
              <span className="count_bottom"><i className="red"><i className="fa fa-sort-desc"></i>12% </i> From last Week</span>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
            <div className="left"></div>
            <div className="right">
              <span className="count_top"><i className="fa fa-user"></i> Total Collections</span>
              <div className="count">2,315</div>
              <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>34% </i> From last Week</span>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 col-xs-4 tile_stats_count">
            <div className="left"></div>
            <div className="right">
              <span className="count_top">
                <i class="fa fa-line-chart" aria-hidden="true"></i> List interest</span>
              <div className="count">{ bank.interest.list } % </div>
              <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i></i></span>
            </div>
          </div>
        </div>


        <div className="heading">
          player: <strong>{ player.profile.name }</strong> bank: <strong>{ bank ? bank.name : "No bank registered!" } </strong>
        </div>
      </div>);
  }
});
