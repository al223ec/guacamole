GameStartPage = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      errors: {}
    }
  },
  getMeteorData() {
    let query = {};

    var handle = Meteor.subscribe("banks");
    return {
      loading: ! handle.ready(),
      currentUser: Meteor.user(),
      bank: Banks.findOne({ owner: Meteor.userId(), gameId: this.props.gameId })
    };
  },
  handleSubmit(event) {
    event.preventDefault();
    var name = $(event.target).find("[name=name]").val();
    var interest = $(event.target).find("[name=interest]").val();

    var errors = {};

    if (!name) {
      errors.name = "Name is required"
    }

    if (!interest) {
      errors.interest = "An interest is required"
    }

    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      return;
    }
    Meteor.call("updateBank", { bankId: this.data.bank._id, name : name, interest: interest });
  },
  render(){
    let { bank } = this.data;
    if (this.data.loading) {
      return <LoadingSpinner />;
    }
    return (
      <div>
        Start { bank.name } interest: { bank.interest }

        <form onSubmit={ this.handleSubmit }>
         <AuthErrors errors={ this.state.errors } />

         <FormInput hasError={!!this.state.errors.name} name="name" type="text" label="Name" value={ bank.name } />
         <FormInput hasError={!!this.state.errors.interest} name="interest" type="number" step="0.01" label="Interest" value={ bank.interest }/>
         <input type="submit" value="Update"/>
         </form>
      </div>
    )
  }
});
