InterestIncomesList = React.createClass({
  propTypes: {
    bank: React.PropTypes.object.isRequired,
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    var data = {};
    var handle = Meteor.subscribe("interest_incomes", this.props.bank._id);

    return {
      loading: ! handle.ready(),
      currentUser: Meteor.user(),
      interestIncomes:  InterestIncomes.find({ bankId: this.props.bank._id }).fetch()
    }
},
  renderInterestIncomes(){
    let { interestIncomes } = this.data;

    var total = 0;
    var rows = []

    for(var i = 0; i < interestIncomes.length; i++){
      total += interestIncomes[i].value;
      if((i+1)%30 == 0){
        rows.push( ( <tr><td> { interestIncomes[i].time }</td> <td> { total }</td> </tr> ) );
        total = 0;
      }
    }
    return rows;
  },
  render() {
    let { interestIncomes } = this.data;

    if (this.data.loading) {
      return <LoadingSpinner />;
    }

    return (<div><table>
        <thead><tr><th></th><th>Interest income</th></tr></thead>
        <tbody>
        { this.renderInterestIncomes() }
      </tbody>
    </table></div>);
  }
});
