Bank = function (doc) {
  _.extend(this, doc);
};
_.extend(Bank.prototype, {
  countTotal: function() {
    var total = 0;
    Customers.find( { bankId: this._id} ).map((customer, index, originalCursor) =>{
      total += customer.loan
    });
    return total;
  },
  getInterest: function(){
    return this.interest;
  },
  getCompareValue: function(risk){
    // Beräkna ett värde som kommer omvandlas till en procentuell andel kunder i förhållande till andra banker
    // console.log(this.interest[risk])
    var interest = this.interest[risk] ? this.interest[risk] : 3;
    return 100 - interest;
  },
  tick: function(){
    /* Tillgångar

    TotalBolåneVolym * ränta
    kundStock.bolån * kundstock.antalKunder = BolåneVolym
    BolåneVolym * ranta/365 = RänteIntäktBolånePerDag

    Interest income mortgages

    Blanco * blancoränat  / 365

    Överlikvid 20% av bolåneVolym + blanco  / 365
    Överlikvid * riksbanksräntan / 365

    // == Ränteintäkt

    Skulder
    lönekonto * lönekonto_räntan / 365
    Sparkonto * sparkonto_ränta  / 365
    extern finanserign * (riksbanksräntan + 0.5) / 365

    == räntekostnad

    ränteintäkt - räntekonstnad = räntenetto

    (( räntenetto / tillångar)/365) * 30
    */
    /** Dagränta
      Volym*ränta/365

    */
  },
  addGrowthRate: function(growthRate){
    // var _growthRate = growthRate > 1 || growthRate < - 1  ? growthRate - Math.round(growthRate) : growthRate;
    var calculatedGrowtRate = this.getGrowthRate() + growthRate;
    calculatedGrowtRate -=  Math.floor(this.getGrowthRate());

    var customersToAdd = this.getCustomersCount() + Math.floor(this.getGrowthRate());
    customersToAdd = customersToAdd < 0 ? 0 : customersToAdd;

    Banks.update(this._id, {
      $set: { growthRate: calculatedGrowtRate, customersCount: customersToAdd }
    });
  },
  addGrowthRateAndReturnCustomersToAdd: function(growthRate){
    var calculatedGrowtRate = this.getGrowthRate() + growthRate;
    var customersToAdd = Math.floor(this.getGrowthRate());
    calculatedGrowtRate -= customersToAdd;

    Banks.update(this._id, {
      $set: { growthRate: { riskOne: calculatedGrowtRate, riskTwo: 0, riskThree: 0, riskFour: 0, riskFive: 0, riskSix: 0 } }
    });
    return customersToAdd;
  },
  getCustomersCount: function(){
    return this.customersCount == null || isNaN( this.customersCount) ? 0 : this.customersCount;
  },
  getGrowthRate: function(){
    return this.growthRate.riskOne == null || isNaN( this.growthRate.riskOne) ? 0 : this.growthRate.riskOne;
  },
  profitAndLoss: function(){
    return "10000"
  },
  calculateProfitAndLoss: function(time){
    console.log("calculateProfitAndLoss")
    Banks.update(this._id, {
      $push: { profitAndLosses: { time: time, customersCount: this.customersCount } }
    });
  }
});
