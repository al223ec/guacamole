Customer = function (doc) {
  _.extend(this, doc);
};
_.extend(Customer.prototype, {
  makeNoise: function () {
    console.log(this.riskClass);
  },
});
