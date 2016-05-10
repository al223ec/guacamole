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
    var interestIncome = 0;
    var interestExpenses = 0;

    balanceSheets.map((balanceSheet) => {
      interestIncome += balanceSheet.interestIncome;
      interestExpenses += balanceSheet.interestExpense;
    });
    
    return (<div className="row">
    <div className="col-md-4 col-sm-4 col-xs-12">
      <div className="x_panel tile fixed_height_320">
        <div className="x_title">
          <h2>Balance sheet</h2>
        </div>

        <div className="x_content">
          <h4>App Usage across versions</h4>
          <div className="widget_summary">
            <div className="w_left w_25">
              <span>0.1.5.2</span>
            </div>
            <div className="w_center w_55">
              <div className="progress">
                <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 66 +'%' }}>
                  <span className="sr-only">60% Complete</span>
                </div>
              </div>
            </div>
            <div className="w_right w_20">
              <span>123k</span>
            </div>
            <div className="clearfix"></div>
          </div>

          <div className="widget_summary">
            <div className="w_left w_25">
              <span>0.1.5.3</span>
            </div>
            <div className="w_center w_55">
              <div className="progress">
                <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 45 + "%" }}>
                  <span className="sr-only">60% Complete</span>
                </div>
              </div>
            </div>
            <div className="w_right w_20">
              <span>53k</span>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="widget_summary">
            <div className="w_left w_25">
              <span>0.1.5.4</span>
            </div>
            <div className="w_center w_55">
              <div className="progress">
                <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 25 + "%" }}>
                  <span className="sr-only">60% Complete</span>
                </div>
              </div>
            </div>
            <div className="w_right w_20">
              <span>23k</span>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="widget_summary">
            <div className="w_left w_25">
              <span>0.1.5.5</span>
            </div>
            <div className="w_center w_55">
              <div className="progress">
                <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 5 +"%" }}>
                  <span className="sr-only">60% Complete</span>
                </div>
              </div>
            </div>
            <div className="w_right w_20">
              <span>3k</span>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="widget_summary">
            <div className="w_left w_25">
              <span>0.1.5.6</span>
            </div>
            <div className="w_center w_55">
              <div className="progress">
                <div className="progress-bar bg-green" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: 2 + "%" }} >
                  <span className="sr-only">60% Complete</span>
                </div>
              </div>
            </div>
            <div className="w_right w_20">
              <span>1k</span>
            </div>
            <div className="clearfix"></div>
          </div>
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
