Meteor.subscribe("games");
Meteor.subscribe("banks");
Meteor.subscribe("players");

Accounts.onLogin(function() {
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
