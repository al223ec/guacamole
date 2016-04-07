var risks = ["riskOne", "riskTwo", "riskThree", "riskFour", "riskFive", "riskSix"];
Bank = function (doc) {
  _.extend(this, doc);
};
_.extend(Bank.prototype, {
  getCompareValue: function(risk){
    // Beräkna ett värde som kommer omvandlas till en procentuell andel kunder i förhållande till andra banker
    // console.log(this.interest[risk])
    var interest = this.interest[risk] ? this.interest[risk] : 3;
    return 100 - interest;
  },
  tick: function(){
    /* Tillgångar
    kundStock.bolån * kundstock.antalKunder = BolåneVolym
    BolåneVolym * ranta/365 = RänteIntäktBolånePerDag
    **/
    // this.interest.riskOne;

    var customerBase = Customers.findOne({ bankId: this._id, riskClass: 1 })
    var mortgageBulk = customerBase.mortgages * Math.floor(customerBase.customersCount)
    mortgageBulk = (mortgageBulk * (this.interest.riskOne/100))/365;

    var blancoBulk = (customerBase.blanco * 1.07)/365;
    var interestIncomes = mortgageBulk + blancoBulk;
    /**
    Interest income mortgages
    Blanco * blancoränat  / 365

    Överlikvid 20% av bolåneVolym + blanco  / 365
    Överlikvid * riksbanksräntan / 365

    interestIncomes
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
});
