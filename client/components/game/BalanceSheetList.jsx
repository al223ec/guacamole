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
      balanceSheets: BalanceSheets.find({ bankId: this.props.bank._id }).fetch(10)
    }
  },
  renderBalanceSheets(){
    let { balanceSheets } = this.data;
    var week = 1;
    var data = {};

    for(var i = 0; i < balanceSheets.length; i++){
      if((i+1) % 3 == 0){
        week

      }
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
  renderSheet: function(){
    let { balanceSheets } = this.data;
    var weeks = [];
    var incomeData = [];
    var expenseData = [];
    var weekCount = 1;
    var income = 0;
    var expense = 0;

    for(var i = 0; i < balanceSheets.length; i++){
      income += balanceSheets[i].interestIncome;
      expense += balanceSheets[i].interestExpense;

      if(i != 0 && balanceSheets[i].time%7 == 0){
        weeks.push('Month ' + weekCount);
        incomeData.push(income);
        expenseData.push(expense);
        weekCount += 1;
        expense = 0;
        income = 0;
      }
    }
    var chartData =  {
      labels: weeks,
      datasets: [{
        label: 'Incomes',
        backgroundColor: "#03586A",
        data: incomeData
      }]
    };

    var expenseChartData = {
      labels: weeks,
      datasets: [{
        label: 'Expenses',
        backgroundColor: "#26B99A",
        data: expenseData
      }]
    };

    return (<div className="row">
      <div className="col-md-6 col-sm-6 col-xs-12">
      <div className="x_panel">
        <div className="x_title">
          <h2>Bar graph <small>Interest incomes</small></h2>
          <div className="clearfix"></div>
        </div>
        <div className="x_content"><iframe className="chartjs-hidden-iframe" kwframeid="2" style={{ width: '100%', display: 'block', border: '0px', height: '0px', margin: '0px', position: 'absolute', left: '0px', right: '0px', top: '0px', bottom: '0px' }}></iframe>
          <BarChart chartData={ chartData } />
        </div>
      </div>
      </div>

      <div className="col-md-6 col-sm-6 col-xs-12">
      <div className="x_panel">
        <div className="x_title">
          <h2>Bar graph <small>Interest incomes</small></h2>
          <div className="clearfix"></div>
        </div>
        <div className="x_content"><iframe className="chartjs-hidden-iframe" kwframeid="2" style={{ width: '100%', display: 'block', border: '0px', height: '0px', margin: '0px', position: 'absolute', left: '0px', right: '0px', top: '0px', bottom: '0px' }}></iframe>
          <BarChart chartData={ expenseChartData } />
        </div>
      </div>
      </div>
    </div>)
  },
  render() {
    let { balanceSheets } = this.data;

    if (this.data.loading) {
      return <LoadingSpinner />;
    }
    return this.renderSheet()
  }
});

// (<div><h2>Balance Sheet list </h2>
//       { balanceSheets.map((balanceSheet) => {
//         return (<div>
//           <ul>
//             <li><span>interestIncome: </span> { balanceSheet.interestIncome }</li>
//             <li><span>interestExpense: </span> { balanceSheet.interestExpense }</li>
//             <li><span>deposit: </span> { balanceSheet.deposit }</li>
//             <li><span>lending: </span> { balanceSheet.lending }</li>
//             <li><span>surplus: </span> { balanceSheet.surplus }</li>
//             <li><span>surplusIncome: </span> { balanceSheet.surplusIncome }</li>
//             <li><span>externalFounding: </span> { balanceSheet.externalFounding }</li>
//             <li><span>externalFoundingExpense: </span> { balanceSheet.externalFoundingExpense }</li>
//           </ul>
//
//         </div>)
//       })}
//
//     </div>);

// <div className="row">
//   <div className="col-md-6 col-sm-6 col-xs-12">
//   <div className="x_panel">
//     <div className="x_title">
//       <h2>Bar graph <small>Sessions</small></h2>
//       <div className="clearfix"></div>
//     </div>
//     <div className="x_content"><iframe className="chartjs-hidden-iframe" kwframeid="2" style={{ width: '100%', display: 'block', border: '0px', height: '0px', margin: '0px', position: 'absolute', left: '0px', right: '0px', top: '0px', bottom: '0px' }}></iframe>
//       <BarChart />
//     </div>
//   </div>
// </div>
// </div>
//
// (<div className="row">
// <div className="col-md-4 col-sm-4 col-xs-12">
//   <div className="x_panel tile fixed_height_320">
//     <div className="x_title">
//       <h2>Balance sheet</h2>
//     </div>
//
//     <div className="x_content">
//       <h4>App Usage across versions</h4>
//       <div className="widget_summary">
//         <div className="w_left w_25">
//           <span>0.1.5.2</span>
//         </div>
//         <div className="w_center w_55">
//           <div className="progress">
//             <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 66 +'%' }}>
//               <span className="sr-only">60% Complete</span>
//             </div>
//           </div>
//         </div>
//         <div className="w_right w_20">
//           <span>123k</span>
//         </div>
//         <div className="clearfix"></div>
//       </div>
//
//       <div className="widget_summary">
//         <div className="w_left w_25">
//           <span>0.1.5.3</span>
//         </div>
//         <div className="w_center w_55">
//           <div className="progress">
//             <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 45 + "%" }}>
//               <span className="sr-only">60% Complete</span>
//             </div>
//           </div>
//         </div>
//         <div className="w_right w_20">
//           <span>53k</span>
//         </div>
//         <div className="clearfix"></div>
//       </div>
//       <div className="widget_summary">
//         <div className="w_left w_25">
//           <span>0.1.5.4</span>
//         </div>
//         <div className="w_center w_55">
//           <div className="progress">
//             <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 25 + "%" }}>
//               <span className="sr-only">60% Complete</span>
//             </div>
//           </div>
//         </div>
//         <div className="w_right w_20">
//           <span>23k</span>
//         </div>
//         <div className="clearfix"></div>
//       </div>
//       <div className="widget_summary">
//         <div className="w_left w_25">
//           <span>0.1.5.5</span>
//         </div>
//         <div className="w_center w_55">
//           <div className="progress">
//             <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 5 +"%" }}>
//               <span className="sr-only">60% Complete</span>
//             </div>
//           </div>
//         </div>
//         <div className="w_right w_20">
//           <span>3k</span>
//         </div>
//         <div className="clearfix"></div>
//       </div>
//       <div className="widget_summary">
//         <div className="w_left w_25">
//           <span>0.1.5.6</span>
//         </div>
//         <div className="w_center w_55">
//           <div className="progress">
//             <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 2 + "%" }} >
//               <span className="sr-only">60% Complete</span>
//             </div>
//           </div>
//         </div>
//         <div className="w_right w_20">
//           <span>1k</span>
//         </div>
//         <div className="clearfix"></div>
//       </div>
//     </div>
//   </div>
// </div>
// </div>)
