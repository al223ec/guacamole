var exposed = FlowRouter.group({});

var authenticated = FlowRouter.group({
  triggersEnter: [function(context, redirect){
    if (!(Meteor.loggingIn() || Meteor.userId())) {
      var route = FlowRouter.current();
      console.log("not logged in")
      if(route.route.name !== 'Login'){
        Session.set('redirectAfterLogin', route.path);
      }
      FlowRouter.go('Login');
    }
  }]
});
// https://meteorhacks.com/flow-router-and-subscription-management
var authenticatedAdmin = authenticated.group({
  prefix: '/admin',
  name: 'Admin',
  triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return FlowRouter.go(FlowRouter.path('Dashboard'));
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


authenticated.route("/game/:game_id", {
  name: "Game",
  action(params){
    renderMainLayoutWith(<GameStateManager gameId={ params.game_id } />);
  }
});

var gameRoutes = authenticated.group({
    prefix: "/game/:game_id",
    name: "Game"
});

gameRoutes.route('/start', {
  name: "Start",
  action(params){
    renderMainLayoutWith(<GameStateManager gameId={ params.game_id } myChildComponent=<GameStartPage gameId={ params.game_id }/> />);
  },
});

authenticated.route("/bank/:id", {
  name: "Bank",
  action(params){
    renderMainLayoutWith(<BankEditor bankId={ params.id } />);
  }
});

authenticated.route("/dashboard", {
  name: "Dashboard",
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
