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
    var lending = 0;
    var deposits = 0;

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
          var customersCount = customersCount;
          var mortgageBulk = customerBase.mortgages * customersCount;
          mortgageBulk = (mortgageBulk * (bank.interest[risks[i]]/100))/365;

          var blancoBulk = customerBase.blanco * customersCount;
          blancoBulk = (blancoBulk * (bank.blancoInterest[risks[i]]/100))/365;

          var interestIncome =  mortgageBulk + blancoBulk;
          interestIncomes[bank._id] = isNaN(interestIncomes[bank._id]) ? interestIncome : interestIncomes[bank._id] + interestIncome;

          var interestExpense = (customerBase.savings * customersCount * (bank.savingsInterest/100))/365;
          interestExpenses[bank._id] = isNaN(interestExpenses[bank._id]) ? interestExpense : interestExpenses[bank._id] + interestExpense;
          // Addera antal kunder i procent utifrån hur banken står sig mot de övfigastaface
          Customers.update( customerBase._id, {
            $set: { customersCount: customerBase.customersCount + customerBase.customersCount/1000 * growth },
          });

          deposits += customerBase.savings * customersCount;
          lending += customerBase.mortgages * customersCount;
          lending += customerBase.blanco * customersCount;
          //IntersetIncomes must be put in a seperate db.collection with a reference to customerBase
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

    var stibor = 1.5;
    var surplus = lending * 0.2;
    // Överlikvid SurplussLikvidity
    // Ränteintäkt på överlikvid = styrränta
    var surplusIncome = (surplus * stibor/100)/365;
    // spara surplusIncome

    // Extern finanserign tillgångar - inlåning - eget kapital
    var equity = 10000;
    var externalFounding = (lending * 1.2) - deposits - equity;
    // Räntekostnad för extern finansering
    var externalFoundingExpenses = (externalFounding * (stibor+0.5)/100)/365;
    // Spara externalFoundingExpenses

  },
  getTime: function(){
    return this.time == null || isNaN(this.time) ? 0 : this.time;
  }
});
