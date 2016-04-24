InterestExpensesList = React.createClass({
  propTypes: {
    bank: React.PropTypes.object.isRequired,
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    var data = {};
    var handle = Meteor.subscribe("interest_expenses", this.props.bank._id);

    return {
      loading: ! handle.ready(),
      currentUser: Meteor.user(),
      interestExpenses:  InterestExpenses.find({ bankId: this.props.bank._id }).fetch()
    }
},
  renderInterestExpenses(){
    let { interestExpenses } = this.data;

    var total = 0;
    var rows = []

    for(var i = 0; i < interestExpenses.length; i++){
      total += interestExpenses[i].value;
      if((i+1)%30 == 0){
        rows.push( ( <tr><td> { interestExpenses[i].time }</td> <td> { total }</td> </tr> ) );
        total = 0;
      }
    }
    return rows;
  },
  render() {
    let { interestExpenses } = this.data;

    if (this.data.loading) {
      return <LoadingSpinner />;
    }

    return (<div><table>
        <thead><tr><th></th><th>Interest expenses</th></tr></thead>
        <tbody>
        { this.renderInterestExpenses() }
      </tbody>
    </table></div>);
  }
});
