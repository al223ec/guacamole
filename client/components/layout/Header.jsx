Header = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      currentUser: Meteor.user()
    }
  },
  handleLogout(){
    //TODO::känns lämpligt att flytta detta till en egen route senare
    Meteor.logout();
    FlowRouter.go('Home');
  },

  render(){
    let navigation;
    let { currentUser } = this.data;

    if(currentUser){
      navigation = (
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#" onClick={ this.handleLogout }>Logout</a></li>
          <li><a href="/game"> Play! </a></li>
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
