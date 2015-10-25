var exposed = FlowRouter.group({});
var authenticated = FlowRouter.group({
  triggersEnter: [function(context, redirect){
    if (!(Meteor.loggingIn() || Meteor.userId())) {
      var route = FlowRouter.current();
      console.log(route);

      if(route.route.name !== 'Login'){
        Session.set('redirectAfterLogin', route.path);
      }
      FlowRouter.go('Login');
    }
  }]
});

exposed.route("/", {
  name: "Home",
  action(params){
    renderMainLayoutWith(<Home />);
  }
});

exposed.route("/login", {
  name: "Login",
  action(params){
    renderMainLayoutWith(<UserLogin />);
  }
});

exposed.route("/register", {
  name: "Register",
  action(params){
    renderMainLayoutWith(<RegisterUser />);
  }
});

authenticated.route("/game", {
  name: "Game",
  action(params){
    renderMainLayoutWith(<GameStateManager />);
  }
});

function renderMainLayoutWith(component){
  ReactLayout.render(MainLayout, {
    header: <Header />,
    content: component,
    footer: <Footer />
  });
}
