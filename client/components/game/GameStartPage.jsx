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
    let { bank, currentUser } = this.data;
    if (this.data.loading) {
      return <LoadingSpinner />;
    }
    return (<div>
        <span>Startpage</span>


        <BankListItem bank={ bank } player={ currentUser } />

      <form className="update-bank" onSubmit={ this.handleSubmit }>
       <div className="heading">Update bank</div>

       <AuthErrors errors={ this.state.errors } />

       <FormInput hasError={!!this.state.errors.name} name="name" type="text" label="Name" value={ bank.name } />
       <table>
         <thead>
           <tr><th></th><th>Interest</th></tr>
         </thead>
         <tbody>
           <tr>
             <td>List </td>
             <td>
               <FormInput hasError={!!this.state.errors.interest} name="interest" type="number" step="0.01" label="none" value={ bank.interest.list }/>
             </td>
          </tr>
           <tr>
             <td>Risk 1</td>
             <td>
               <FormInput hasError={!!this.state.errors.interest} name="interest" type="number" step="0.01" label="none" value={ bank.interest.riskOne }/>
             </td>
          </tr>
          <tr>
            <td>Risk 2</td>
            <td>
              <FormInput hasError={!!this.state.errors.interest} name="interest" type="number" step="0.01" label="none" value={ bank.interest.riskTwo }/>
            </td>
          </tr>
          <tr>
           <td>Risk 3</td>
           <td>
             <FormInput hasError={!!this.state.errors.interest} name="interest" type="number" step="0.01" label="none" value={ bank.interest.riskThree }/>
           </td>
          </tr>
          <tr>
            <td>Risk 4</td>
            <td>
              <FormInput hasError={!!this.state.errors.interest} name="interest" type="number" step="0.01" label="none" value={ bank.interest.riskFour }/>
            </td>
         </tr>
         <tr>
           <td>Risk 5</td>
           <td>
             <FormInput hasError={!!this.state.errors.interest} name="interest" type="number" step="0.01" label="none" value={ bank.interest.riskFive }/>
           </td>
         </tr>
         <tr>
           <td>Risk 6</td>
           <td>
             <FormInput hasError={!!this.state.errors.interest} name="interest" type="number" step="0.01" label="none" value={ bank.interest.riskSix }/>
           </td>
        </tr>

         </tbody>
       </table>

       <input type="submit" value="Update"/>
       </form>
      <CustomersList bank={ bank } />
      </div>);
  }
});
