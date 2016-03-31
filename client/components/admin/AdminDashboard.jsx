AdminDashboard = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      errors: {}
    }
  },
  getMeteorData() {
    var handle = Meteor.subscribe("games");
    return {
      loading: ! handle.ready(),
      games: Games.find().fetch()
    };
  },
  // NewGame
  /******
  handleSubmit(event) {
    event.preventDefault();
    var name = $(event.target).find("[name=name]").val();
    var errors = {};

    if (!name) {
      errors.name = "Name is required"
    }

    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      return;
    }
  },*****/
  render(){
    if (this.data.loading) {
      return <LoadingSpinner />;
    }
    return (<div>
        { this.data.games.map((game) => {
          return <AdminGameListItem
            key={ game._id }
            game={ game } />;
        })}
    </div>)
  }
});


/*         <h3>Create new game</h3>
        <form onSubmit={ this.handleSubmit }>
         <AuthErrors errors={ this.state.errors } />

         <FormInput hasError={!!this.state.errors.name} name="name" type="text" label="Name" value=""/>
         <input type="submit" value="Create"/>
         </form>
*/
