UserLogin = React.createClass({
  mixins: [],
  PropTypes: {

  },
  getInitialState() {
    return {
      errors: {}
    }
  },
  getMeteorData() {
    return {

    }
  },
  onSubmit(event) {
    event.preventDefault();

    var email = $(event.target).find("[name=email]").val();
    var password = $(event.target).find("[name=password]").val();

    var errors = {};

    if (!email) {
      errors.email = "Email required"
    }

    if (!password) {
      errors.password = "Password required"
    }

    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      return;
    }

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        this.setState({
          errors: {'none': error.reason}
        });
        return;
      }
      // FlowRouter.go('Home');
    });
  },
  render(){
    return (
      <div className="login-container">
        <h1>Login</h1>

          <form onSubmit={this.onSubmit}>
           <AuthErrors errors={this.state.errors} />

           <FormInput hasError={!!this.state.errors.email} name="Email" type="text" label="Email" />
           <FormInput hasError={!!this.state.errors.password} name="Password" type="password" label="Password" />
           <input type="submit" value="Login"/>
       </form>
      </div>
    )
  }
});
