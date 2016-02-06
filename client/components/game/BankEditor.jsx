BankEditor = React.createClass({
  propTypes: {
    bankId: React.PropTypes.string.isRequired
  },
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      errors: {}
    }
  },
  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      bank: Banks.findOne({ _id: this.props.bankId })
    }
  },
  handleSubmit(event) {
    event.preventDefault();
    var name = $(event.target).find("[name=name]").val();
    var interest = $(event.target).find("[name=interest]").val();
    console.log(name);
    
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

    Meteor.call("updateBank", { name : name, interest: interest });
    React.findDOMNode(this.refs.textInput).value = "";
  },
  render(){
    return (
      <div className="game-editor">
        <h1>Game Editor</h1>

          <form onSubmit={ this.handleSubmit }>
           <AuthErrors errors={ this.state.errors } />

           <FormInput hasError={!!this.state.errors.name} name="Name" type="text" label="Name" value={ this.data.bank.name } />
           <FormInput hasError={!!this.state.errors.interest} name="Interest" type="number" label="Interest" />
           <input type="submit" value="Update"/>
       </form>
      </div>
    )
  }
});
