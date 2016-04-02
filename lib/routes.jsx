var exposed = FlowRouter.group({});

var authenticated = FlowRouter.group({
  triggersEnter: [function(context, redirect){
    if (!(Meteor.loggingIn() || Meteor.userId())) {
      var route = FlowRouter.current();
      console.error("not logged in");

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
    console.log( Roles.userIsInRole(Meteor.userId(), 'admin'))
    if (! Roles.userIsInRole(Meteor.userId(), 'admin')) {
      console.error("User not admin");
      FlowRouter.go('Home');
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
    renderMainLayoutWith(<GameStateManager gameId={ params.game_id } gameState="startPage" />);
  }
});

var gameRoutes = authenticated.group({
    prefix: "/game/:game_id",
    name: "Game"
});

gameRoutes.route('/start', {
  name: "Start",
  action(params){
    renderMainLayoutWith(<GameStateManager gameId={ params.game_id } gameState="startPage" />);
  },
});

gameRoutes.route('/toplist', {
  name: "Toplist",
  action(params){
    renderMainLayoutWith(<GameStateManager gameId={ params.game_id } gameState="toplist" />);
  },
});

authenticatedAdmin.route("/", {
  name: "AdminDashboard",
  action(params){
    renderMainLayoutWith(<GameStateManager gameState="admin" />);
  }
});
// authenticated.route("/bank/:id", {
//   name: "Bank",
//   action(params){
//     renderMainLayoutWith(<BankEditor bankId={ params.id } />);
//   }
// });
//
// authenticated.route("/dashboard", {
//   name: "Dashboard",
//   action(params){
//     renderMainLayoutWith(<GameStateManager />);
//   }
// });

function renderMainLayoutWith(component){
  ReactLayout.render(MainLayout, {
    header: <Header />,
    content: component,
    footer: <Footer />
  });
}
