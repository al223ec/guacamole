Header = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var handle = Meteor.subscribe("games");

    console.log(Roles.userIsInRole(Meteor.userId(), 'admin'));
    return {
      loading: ! handle.ready(),
      currentUser: Meteor.user(),
      game: Roles.userIsInRole(Meteor.userId(), 'admin') ? Games.findOne({ ongoing: true }) : Games.findOne( { players: Meteor.userId(), ongoing: true } ),
    //  bank: Banks.find({ owner: Meteor.userId() }).fetch(),
    //  game: Games.findOne( { players: Meteor.userId(), ongoing: true } )
    }
  },
  handleLogout(){
    //TODO::känns lämpligt att flytta detta till en egen route senare
    Meteor.logout();
    FlowRouter.go('Home');
  },

  render(){
    let navigation;
    let { currentUser, game } = this.data;

    if(currentUser){
      if (this.data.loading) {
        return <LoadingSpinner />;
      }

      navigation = (
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#" onClick={ this.handleLogout }>Logout</a></li>
          <li><a href={ "/game/" + game._id }> Play! </a></li>
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
