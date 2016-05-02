var risks = ["riskOne", "riskTwo", "riskThree", "riskFour", "riskFive", "riskSix"];
var averageCompareValues = []
Game = function (doc) {
  _.extend(this, doc);
};
_.extend(Game.prototype, {
  tick: function(){
    var game = this;
    if(!game.ongoing){
      return
    }
    var time = game.time == null || isNaN(game.time) ? 0 : game.time +=1;
    Games.update(game._id,  { $set: { time: time } });

    var banks = Banks.find({ gameId: game._id })
    var balanceSheets = {};

    banks.map((bank) =>{
      balanceSheets[bank._id] = {
        bankId: bank._id,
        time: time,
        interestIncome: 0,
        interestExpense: 0,
        deposit: 0,
        lending: 0,
        surplus: 0,
        surplusIncome: 0,
        externalFounding: 0,
        externalFoundingExpense: 0,
      }
    });

    for(var i = 0; i < risks.length; i++){
      var average = 0;
      banks.map((bank) =>{
        average += bank.getCompareValue(risks[i]);
      });

      average = average/banks.count();

      var onePercent = average/100;

      banks.map((bank) => {
        var growth = (bank.getCompareValue(risks[i]) - average)/onePercent; // i procent jämfört med övriga banker
        var customerBase = Customers.findOne({ riskClass: i + 1, bankId: bank._id, customersCount: { $gt: 0 } });

        // Addera skydd för när customersCount ev tar slut. kanske funkar med ett minus värde?
        if(customerBase){
          var customersCount = customerBase.customersCount;
          var mortgageBulk = customerBase.mortgages * customersCount;
          var blancoBulk = customerBase.blanco * customersCount;

          var interestIncome = (mortgageBulk * (bank.interest[risks[i]]/100))/365 + (blancoBulk * (bank.blancoInterest[risks[i]]/100))/365;
          var interestExpense = (customerBase.savings * customersCount * (bank.savingsInterest/100))/365;

          // Addera antal kunder i procent utifrån hur banken står sig mot de övfigastaface
          Customers.update( customerBase._id, {
            $set: { customersCount: customerBase.customersCount + customerBase.customersCount/1000 * growth },
          });

          balanceSheets[bank._id].interestIncome += interestIncome
          balanceSheets[bank._id].interestExpense += interestExpense
          balanceSheets[bank._id].deposit += customerBase.savings * customersCount;
          balanceSheets[bank._id].lending += customerBase.mortgages * customersCount + customerBase.blanco * customersCount;
        }
      });
    }

    // for (var bankId in interestIncomes) {
    //   InterestIncomes.insert({
    //     bankId: bankId,
    //     time: time,
    //     value: interestIncomes[bankId]
    //   });
    // }
    //
    // for (var bankId in interestExpenses){
    //   InterestExpenses.insert({
    //     bankId: bankId,
    //     time: time,
    //     value: interestExpenses[bankId]
    //   });
    // }

    for (var bankId in balanceSheets){
      var lending = balanceSheets[bankId].lending
      var deposit = balanceSheets[bankId].deposit

      var stibor = 1.5;
      var surplus = lending * 0.2;
      // Överlikvid SurplussLikvidity
      // Ränteintäkt på överlikvid = styrränta
      var surplusIncome = (surplus * stibor/100)/365;
      // Extern finanserign tillgångar - inlåning - eget kapital
      var equity = 10000;
      var externalFounding = (lending * 1.2) - deposit - equity;
      // Räntekostnad för extern finansering
      var externalFoundingExpense = (externalFounding * (stibor+0.5)/100)/365;
      // Spara externalFoundingExpenses
      balanceSheets[bankId].surplus = surplus
      balanceSheets[bankId].surplusIncome = surplusIncome
      balanceSheets[bankId].externalFounding = externalFounding
      balanceSheets[bankId].externalFoundingExpense = externalFoundingExpense

      BalanceSheets.insert(balanceSheets[bankId]);
    }
  },
  getTime: function(){
    return this.time == null || isNaN(this.time) ? 0 : this.time;
  },

});
