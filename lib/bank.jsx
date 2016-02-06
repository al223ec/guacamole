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
  }
});
