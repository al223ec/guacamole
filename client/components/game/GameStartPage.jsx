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
          <span>Startpage</span>
          <BankListItem bank={ bank } player={ currentUser } />
          <BalanceSheetList bank={ bank } />

          <BankEditor bank={ bank } />
      </div>);
  }
});
