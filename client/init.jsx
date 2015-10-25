Meteor.subscribe("games");

Accounts.onLogin(function() {
  console.log("Accounts.onLogin")
  var redirect;
  redirect = Session.get('redirectAfterLogin');
  if (redirect != null) {
    if (redirect !== '/login') {
      FlowRouter.go(redirect);
    }
  }else{
    FlowRouter.go('Home');
  }
});

Meteor.startup(function () {

});
