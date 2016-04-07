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

    for(var i = 0; i < risks.length; i++){
      var average = 0;

      banks.map((bank) =>{
        average += bank.getCompareValue(risks[i]);
      });
      average = average/banks.count();
      averageCompareValues[risks[i]] = average;

      var onePercent = average/100;

      banks.map((bank) => {
        var growth = (bank.getCompareValue(risks[i]) - average)/onePercent; // i procent jämfört med övriga banker
        var customer = Customers.findOne({ riskClass: i + 1, bankId: bank._id, customersCount: { $gt: 0 } });

        var mortgageBulk = customer.mortgages * Math.floor(customer.customersCount)
        mortgageBulk = (mortgageBulk * (bank.interest.riskOne/100))/365;
        var blancoBulk = customer.blanco * 1.07;
        var interestIncomes = mortgageBulk + blancoBulk;

        // console.log(averageCompareValues);
        // Addera skydd för när customersCount ev tar slut. kanske funkar med ett minus värde?
        if(customer){
          // Addera antal kunder i procent utifrån hur banken står sig mot de övfiga
          Customers.update( customer._id, { $set: { customersCount:customer.customersCount + customer.customersCount/1000 * growth }});
        }
      });
    }
  },
  getTime: function(){
    return this.time == null || isNaN(this.time) ? 0 : this.time;
  }
});
