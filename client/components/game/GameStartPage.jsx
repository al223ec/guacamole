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
    return (<div>
        <span>Startpage</span>
        <div className="bank-list-item">
        <div className="heading">
          bank: <strong>{ bank ? bank.name : "No bank registered!" } </strong>
        </div>

        <div className="info">
          <ul>
            <li><div><span className="meta">interest:</span> <strong>{ bank.interest } </strong></div></li>
            <li><div><span className="meta">growthRate:</span> <strong>{ bank.growthRate } </strong></div></li>
            <li><div><span className="meta">customersCount:</span> <strong>{ bank.customersCount } </strong></div></li>
          </ul>
        </div>
        <div className="results">
          { bank.profitAndLoss() }
          </div>
      </div>

      <form className="update-bank" onSubmit={ this.handleSubmit }>
       <div className="heading">Update bank</div>

       <AuthErrors errors={ this.state.errors } />

       <FormInput hasError={!!this.state.errors.name} name="name" type="text" label="Name" value={ bank.name } />
       <FormInput hasError={!!this.state.errors.interest} name="interest" type="number" step="0.01" label="Interest" value={ bank.interest }/>
       <input type="submit" value="Update"/>
       </form>
      </div>);
  }
});
