Meteor.subscribe("banks");
console.log("init")
Accounts.onLogin(function() {
  var redirect;
  redirect = Session.get('redirectAfterLogin');
  if (redirect != null) {
    if (redirect !== '/login') {
      FlowRouter.go(redirect);
    }
  }
});

Meteor.startup(function () {
  console.log("Meteor startup");
});
