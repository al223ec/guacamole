Bank = function (doc) {
  _.extend(this, doc);
};
_.extend(Bank.prototype, {
  makeNoise: function () {
    console.log(this.name);
  },
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
  getCompareValue: function(){
    // Beräkna ett värde som kommer omvandlas till en procentuell andel kunder i förhållande till andra banker
    var interest = this.interest.list ? this.interest.list : 3;
    return 10 - interest;
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
    calculatedGrowtRate -=  Math.floor(this.getGrowthRate()); // customersToAdd > 0 ? calculatedGrowtRate = calculatedGrowtRate - customersToAdd : calculatedGrowtRate -= customersToAdd;

    var customersToAdd = this.getCustomersCount() + Math.floor(this.getGrowthRate());
    customersToAdd = customersToAdd < 0 ? 0 : customersToAdd;

    Banks.update(this._id, {
      $set: { growthRate: calculatedGrowtRate, customersCount: customersToAdd }
    });
  },
  getCustomersCount: function(){
    return this.customersCount == null || isNaN( this.customersCount) ? 0 : this.customersCount;
  },
  getGrowthRate: function(){
    return this.growthRate == null || isNaN( this.growthRate) ? 0 : this.growthRate;
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
