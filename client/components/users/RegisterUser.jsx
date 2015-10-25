RegisterUser = React.createClass({
  mixins: [],
  PropTypes: {

  },
  getInitialState() {
    return {
      errors: {}
    }
  },
  getMeteorData() {
    return { }
  },
  onSubmit(event) {
    event.preventDefault();

    var email = $(event.target).find("[name=email]").val();
    var password = $(event.target).find("[name=password]").val();

    var errors = {};

    if (!email) { // validate email.
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
    // Detta måste väl göras server side??
    Accounts.createUser({
      email: email,
      password: password
    }, (error) => {
      if (error) {
        this.setState({
          errors: {'none': error.reason}
        });
        return;
      }

      FlowRouter.go('Home');

    });
  },
  render(){
    //  <FormInput hasError={!!this.state.errors.confirmEmail} name="ConfirmEmail" type="text" label="Confirm email" />
    return (
      <div className="login-container">
        <h1>Register</h1>

          <form onSubmit={this.onSubmit}>
           <AuthErrors errors={this.state.errors} />

           <FormInput hasError={!!this.state.errors.email} name="Email" type="email" label="Email" />
           <FormInput hasError={!!this.state.errors.password} name="Password" type="password" label="Password" />
           <input type="submit" value="Register"/>
       </form>
      </div>
    )
  }
});
