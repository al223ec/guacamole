GameStartPage = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let query = {};

    var handle = Meteor.subscribe("banks");
    return {
      loading: ! handle.ready(),
      currentUser: Meteor.user(),
      bank: Banks.findOne({ owner: Meteor.userId(), gameId: this.props.gameId })
    };
  },
  render(){
    let { bank, currentUser } = this.data;
    if (this.data.loading) {
      return <LoadingSpinner />;
    }

    return (<div>
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="x_panel">
                <div className="x_title">
                  <h2>Bar graph <small>Sessions</small></h2>
                  <ul className="nav navbar-right panel_toolbox">
                    <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                    </li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                      <ul className="dropdown-menu" role="menu">
                        <li><a href="#">Settings 1</a>
                        </li>
                        <li><a href="#">Settings 2</a>
                        </li>
                      </ul>
                    </li>
                    <li><a className="close-link"><i className="fa fa-close"></i></a>
                    </li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
                <div className="x_content"><iframe className="chartjs-hidden-iframe" kwframeid="2" style={{ width: '100%', display: 'block', border: '0px', height: '0px', margin: '0px', position: 'absolute', left: '0px', right: '0px', top: '0px', bottom: '0px' }}></iframe>
                  
                </div>
              </div>
            </div>
          </div>

          <BarChart />
          <BankListItem bank={ bank } player={ currentUser } />
          <BankEditor bank={ bank } />
          <BalanceSheetList bank={ bank } />
      </div>);
  }
});
