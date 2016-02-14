Bank = function (doc) {
  _.extend(this, doc);
};
_.extend(Bank.prototype, {
  makeNoise: function () {
    console.log(this.name);
  },
  countTotal: function() {
    var total = 0;
    Customers.find( { bankId: this._id} ).forEach(function(customer){
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
  }
});
