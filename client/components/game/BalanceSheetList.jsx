BalanceSheetList = React.createClass({
  propTypes: {
    bank: React.PropTypes.object.isRequired,
  },
  mixins: [ReactMeteorData],
  getMeteorData() {
    var data = {};
    var handle = Meteor.subscribe("balance_sheets", this.props.bank._id);

    return {
      loading: !handle.ready(),
      currentUser: Meteor.user(),
      balanceSheets: BalanceSheets.find({ bankId: this.props.bank._id }).fetch()
    }
  },
  // renderInterestExpenses(){
  //   let { interestExpenses } = this.data;
  //
  //   var total = 0;
  //   var rows = []
  //
  //   for(var i = 0; i < interestExpenses.length; i++){
  //     total += interestExpenses[i].value;
  //     if((i+1)%30 == 0){
  //       rows.push( ( <tr><td> { interestExpenses[i].time }</td> <td> { total }</td> </tr> ) );
  //       total = 0;
  //     }
  //   }
  //   return rows;
  // },
  render() {
    let { balanceSheets } = this.data;

    if (this.data.loading) {
      return <LoadingSpinner />;
    }

    return (<div><h2>Balance Sheet list </h2>
          { balanceSheets.map((balanceSheet) => {
            return (<div>
              <ul>
                <li><span>interestIncome: </span> { balanceSheet.interestIncome }</li>
                <li><span>interestExpense: </span> { balanceSheet.interestExpense }</li>
                <li><span>deposit: </span> { balanceSheet.deposit }</li>
                <li><span>lending: </span> { balanceSheet.lending }</li>
                <li><span>surplus: </span> { balanceSheet.surplus }</li>
                <li><span>surplusIncome: </span> { balanceSheet.surplusIncome }</li>
                <li><span>externalFounding: </span> { balanceSheet.externalFounding }</li>
                <li><span>externalFoundingExpense: </span> { balanceSheet.externalFoundingExpense }</li>
              </ul>

            </div>)
          })}

        </div>);
  }
});
