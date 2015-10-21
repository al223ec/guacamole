UserLogin = React.createClass({
  onSubmit(e) {
    e.preventDefault();
    var _this = this;
    var email = e.target.email.value;
    var password = e.target.password.value;
    Meteor.loginWithPassword(email, password, function(error){
      if(error){
        console.log(error.reason);
      }else{
        FlowRouter.go('Home');
      }
    });
  },
  render(){
    return (
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit= { this.onSubmit }>
          <input type="email" name="email" placeholder="Enter email..." />
          <input type="password" name="password" placeholder="Enter password..."/>
          <input type="submit" value="login" />
        </form>
      </div>
    )
  }
});
