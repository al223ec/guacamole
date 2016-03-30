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
    var interest = this.interest ? this.interest : 3;
    return 10 - interest;
  },
  addGrowthRateAndCustomers: function(growthRate){},
  addGrowthRate: function(growthRate){
    var _growthRate = growthRate > 1 || growthRate < - 1  ? growthRate - Math.round(growthRate) : growthRate;

    Banks.update(this._id, {
      $set: { growthRate: _growthRate, customersCount:  this.getCustomersCount() + Math.round(growthRate) }
    });
  },
  addCustomers: function(numberOfCustomers){

  },
  getCustomersCount: function(){
    return this.customersCount == null || isNaN( this.customersCount) ? 0 : this.customersCount;
  },
  getGrowthRate: function(){
    return this.growthRate == null || isNaN( this.growthRate) ? 0 : this.growthRate;
  }
});
