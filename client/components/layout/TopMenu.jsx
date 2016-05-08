TopMenu = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var handle = Meteor.subscribe("games");

    return {
      loading: ! handle.ready(),
      currentUser: Meteor.user(),
      game: Roles.userIsInRole(Meteor.userId(), 'admin') ? null : Games.findOne( { players: Meteor.userId() } ),
      isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin')
    }
  },
  handleLogout(){
    //TODO::känns lämpligt att flytta detta till en egen route senare
    Meteor.logout();
    FlowRouter.go('Home');
  },

  render(){
    let navigation;
    let { currentUser, game, isAdmin } = this.data;

    if(currentUser){
      if (this.data.loading) {
        return <LoadingSpinner />;
      }

      navigation = (
        <ul className="dropdown-menu dropdown-usermenu pull-right">
          <li><a href="/">Home</a></li>
          <li><a href="#" onClick={ this.handleLogout }>Logout</a></li>
          <li><a href={ game !== null ? "/game/" + game._id : "/admin/" } > { isAdmin ? "Dashboard" : "Play!" } </a></li>
        </ul>
      )
    }else{
      navigation = (
        <ul className="dropdown-menu dropdown-usermenu pull-right">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      )
    }
    return (<div className="top_nav">
        <div className="nav_menu">
          <nav className="" role="navigation">
            <ul className="nav navbar-nav navbar-right">
              <li className="">
                <a href="javascript:;" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  <img src="./Gentallela Alela! __files/img.jpg" alt=""></img>
                  { currentUser ? currentUser.profile.name : 'Please log in'}
                  <span className=" fa fa-angle-down"></span>
                </a>

                { navigation }
              </li>
            </ul>
          </nav>
        </div>
      </div>)
  }
});
