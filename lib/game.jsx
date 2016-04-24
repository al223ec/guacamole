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

    var interestIncomes = {};
    var interestExpenses = {};

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
          var mortgageBulk = customerBase.mortgages * Math.floor(customerBase.customersCount)
          mortgageBulk = (mortgageBulk * (bank.interest[risks[i]]/100))/365;

          var blancoBulk = (customerBase.blanco * (bank.blancoInterest[risks[i]]/100))/365;
          var interestIncome =  mortgageBulk + blancoBulk;
          interestIncomes[bank._id] = isNaN(interestIncomes[bank._id]) ? interestIncome : interestIncomes[bank._id] + interestIncome;

          var interestExpense = (customerBase.savings * Math.floor(customerBase.customersCount) * (bank.savingsInterest/100))/365;
          interestExpenses[bank._id] = isNaN(interestExpenses[bank._id]) ? interestExpense : interestExpenses[bank._id] + interestExpense;
          // Addera antal kunder i procent utifrån hur banken står sig mot de övfigastaface
          Customers.update( customerBase._id, {
            $set: { customersCount: customerBase.customersCount + customerBase.customersCount/1000 * growth },
          });
        }
      });
    }

    for (var bankId in interestIncomes) {
      InterestIncomes.insert({
        bankId: bankId,
        time: time,
        value: interestIncomes[bankId]
      });
    }

    for (var bankId in interestExpenses){
      InterestExpenses.insert({
        bankId: bankId,
        time: time,
        value: interestExpenses[bankId]
      });
    }
  },
  getTime: function(){
    return this.time == null || isNaN(this.time) ? 0 : this.time;
  }
});
