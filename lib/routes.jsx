FlowRouter.route("/", {
  name: "Home",
  action(params){
    renderMainLayoutWith(<Home />);
  }
});

FlowRouter.route("/login", {
  name: "Login",
  action(params){
    renderMainLayoutWith(<UserLogin />);
  }
});

FlowRouter.route("/register", {
  name: "Register",
  action(params){
    renderMainLayoutWith(<RegisterUser />);
  }
});

FlowRouter.route("/game", {
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
