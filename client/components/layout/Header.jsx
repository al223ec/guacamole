Header = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var handle = Meteor.subscribe("games");

    return {
      loading: ! handle.ready(),
      currentUser: Meteor.user(),
      game: Roles.userIsInRole(Meteor.userId(), 'admin') ? null : Games.findOne( { players: Meteor.userId(), ongoing: true } ),
      isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin')
    }
  },
  handleLogout(){
    //TODO::känns lämpligt att flytta detta till en egen route senare
    Meteor.logout();
    FlowRouter.go('Home');
  },

  render(){
    let navigation;
    let { currentUser, game, isAdmin } = this.data;

    if(currentUser){
      if (this.data.loading) {
        return <LoadingSpinner />;
      }

      navigation = (
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#" onClick={ this.handleLogout }>Logout</a></li>
          <li><a href={ game !== null ? "/game/" + game._id : "/admin/" } > { isAdmin ? "Dashboard" : "Play!" } </a></li>
        </ul>
      )
    }else{
      navigation = (
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      )
    }
    return (
      <header className="page-header">
        <div><h1> Guacamole Game </h1></div>
        { navigation }
      </header>
     )
  }
});
