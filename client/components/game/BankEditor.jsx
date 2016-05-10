BankEditor = React.createClass({
  propTypes: {
    bank: React.PropTypes.object.isRequired
  },
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      errors: {}
    }
  },
  getMeteorData() {
    return { }
  },
  handleSubmit(event) {
    event.preventDefault();
    var errors = {};

    var name = $(event.target).find("[name=name]").val();
    var savingsInterest =  $(event.target).find("[name=savings_interest]").val();
    var interest = {
      list: $(event.target).find("[name=list]").val(),
      risk_one: $(event.target).find("[name=risk_one]").val(),
      risk_two: $(event.target).find("[name=risk_two]").val(),
      risk_three: $(event.target).find("[name=risk_three]").val(),
      risk_four: $(event.target).find("[name=risk_four]").val(),
      risk_five: $(event.target).find("[name=risk_five]").val(),
      risk_six: $(event.target).find("[name=risk_six]").val()
    }

    var blancoInterest = {
      blanco_list: $(event.target).find("[name=blanco_list]").val(),
      blanco_risk_one: $(event.target).find("[name=blanco_risk_one]").val(),
      blanco_risk_two: $(event.target).find("[name=blanco_risk_two]").val(),
      blanco_risk_three: $(event.target).find("[name=blanco_risk_three]").val(),
      blanco_risk_four: $(event.target).find("[name=blanco_risk_four]").val(),
      blanco_risk_five: $(event.target).find("[name=blanco_risk_five]").val(),
      blanco_risk_six: $(event.target).find("[name=blanco_risk_six]").val()
    }

    if (!name) {
      errors.name = "Name is required"
    }
    for(var prop in interest){
      if(!interest[prop]){
        errors[prop] = "Interest " + prop +" is required"
      }
    }

    for(var prop in blancoInterest){
      if(!blancoInterest[prop]){
        errors[prop] = "Blanco interest " + prop +" is required"
      }
    }
    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      return;
    }
    //FIX THIS
    var camelInterest = {
      list: $(event.target).find("[name=list]").val(),
      riskOne: $(event.target).find("[name=risk_one]").val(),
      riskTwo: $(event.target).find("[name=risk_two]").val(),
      riskThree: $(event.target).find("[name=risk_three]").val(),
      riskFour: $(event.target).find("[name=risk_four]").val(),
      riskFive: $(event.target).find("[name=risk_five]").val(),
      riskSix: $(event.target).find("[name=risk_six]").val()
    }
    var camelBlancoInterest = {
      list: $(event.target).find("[name=blanco_list]").val(),
      riskOne: $(event.target).find("[name=blanco_risk_one]").val(),
      riskTwo: $(event.target).find("[name=blanco_risk_two]").val(),
      riskThree: $(event.target).find("[name=blanco_risk_three]").val(),
      riskFour: $(event.target).find("[name=blanco_risk_four]").val(),
      riskFive: $(event.target).find("[name=blanco_risk_five]").val(),
      riskSix: $(event.target).find("[name=blanco_risk_six]").val()
    }

    Meteor.call("updateBank", {
      bankId: this.props.bank._id,
      name : name,
      interest: camelInterest,
      blancoInterest: camelBlancoInterest,
      savingsInterest: savingsInterest
    });
    // React.findDOMNode(this.refs.textInput).value = "";
  },
  render(){
    let { bank } = this.props;

    return (
      <div className="row">
        <div className="col-md-6 col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <h2>Update your bank <small>update interest to compete for customers and enternal glory</small></h2>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <br />
              <form className="form-horizontal form-label-left" onSubmit={ this.handleSubmit }>
                <AuthErrors errors={ this.state.errors } />
                <FormInput hasError={!!this.state.errors.name} name="name" type="text" label="Name" value={ bank.name } />

                <table>
                  <thead>
                    <tr><th>&nbsp;</th><th>Mortgage interest</th><th>Blanco interest</th><th>Savings interest</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>List </td>
                      <td>
                        <FormInput hasError={!!this.state.errors.list} name="list" type="number" step="0.01" label="none" value={ bank.interest.list }/>
                      </td>
                      <td>
                        <FormInput hasError={!!this.state.errors.blanco_list} name="blanco_list" type="number" step="0.01" label="none" value={ bank.blancoInterest.list }/>
                      </td>
                      <td>
                        <FormInput hasError={!!this.state.errors.savings_interest} name="savings_interest" type="number" step="0.01" label="none" value={ bank.savingsInterest }/>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Risk 1</td>
                      <td>
                        <FormInput hasError={!!this.state.errors.risk_one} name="risk_one" type="number" step="0.01" label="none" value={ bank.interest.riskOne }/>
                      </td>
                      <td>
                        <FormInput hasError={!!this.state.errors.blanco_risk_one} name="blanco_risk_one" type="number" step="0.01" label="none" value={ bank.blancoInterest.riskOne }/>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Risk 2</td>
                      <td>
                        <FormInput hasError={!!this.state.errors.risk_two} name="risk_two" type="number" step="0.01" label="none" value={ bank.interest.riskTwo }/>
                      </td>
                      <td>
                        <FormInput hasError={!!this.state.errors.blanco_risk_two} name="blanco_risk_two" type="number" step="0.01" label="none" value={ bank.blancoInterest.riskTwo }/>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Risk 3</td>
                      <td>
                        <FormInput hasError={!!this.state.errors.risk_three} name="risk_three" type="number" step="0.01" label="none" value={ bank.interest.riskThree }/>
                      </td>
                      <td>
                        <FormInput hasError={!!this.state.errors.blanco_risk_three} name="blanco_risk_three" type="number" step="0.01" label="none" value={ bank.blancoInterest.riskThree }/>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Risk 4</td>
                      <td>
                        <FormInput hasError={!!this.state.errors.risk_four} name="risk_four" type="number" step="0.01" label="none" value={ bank.interest.riskFour }/>
                      </td>
                      <td>
                        <FormInput hasError={!!this.state.errors.blanco_risk_four} name="blanco_risk_four" type="number" step="0.01" label="none" value={ bank.blancoInterest.riskFour }/>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Risk 5</td>
                      <td>
                        <FormInput hasError={!!this.state.errors.risk_five} name="risk_five" type="number" step="0.01" label="none" value={ bank.interest.riskFive }/>
                      </td>
                      <td>
                        <FormInput hasError={!!this.state.errors.blanco_risk_five} name="blanco_risk_five" type="number" step="0.01" label="none" value={ bank.blancoInterest.riskFive }/>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Risk 6</td>
                      <td>
                        <FormInput hasError={!!this.state.errors.risk_six} name="risk_six" type="number" step="0.01" label="none" value={ bank.interest.riskSix }/>
                      </td>
                      <td>
                        <FormInput hasError={!!this.state.errors.blanco_risk_six} name="blanco_risk_six" type="number" step="0.01" label="none" value={ bank.blancoInterest.riskSix }/>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>

                <div className="ln_solid"></div>
                <div className="form-group">
                  <div className="col-md-9 col-sm-9 col-xs-12 col-md-offset-4">
                    <button type="submit" className="btn btn-success">Update</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>)
    }
  });
