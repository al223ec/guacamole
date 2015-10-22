Header = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      currentUser: Meteor.user()
    }
  },
  handleLogout(){
    Meteor.logout();
  },

  render(){
    let loginButton;
    let { currentUser } = this.data;

    if(currentUser){
      loginButton = (
        <li><a href="#" onClick={ this.handleLogout }>Logout</a></li>
      )
    }else{
      loginButton = (
        <li><a href="/login">Login</a></li>
      )
    }
    return (
      <header className="page-header">
        <div><h1> Guacamole Game </h1></div>
        <ul>
          <li><a href="/">Home</a></li>
          { loginButton }
          { currentUser ? '' : <li><a href="/register">Register</a></li> } 
        </ul>
      </header>
     )
  }
});
