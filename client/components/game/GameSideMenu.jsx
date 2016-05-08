SideMenu = React.createClass({
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

      navigation = (<ul>
          <li><a href="/">Home</a></li>
          <li><a href="#" onClick={ this.handleLogout }>Logout</a></li>
          <li><a href={ game !== null ? "/game/" + game._id : "/admin/" } > { isAdmin ? "Dashboard" : "Play!" } </a></li>
        </ul>)
    }else{
      navigation = (<ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>)
    }
    
    return (<div className="col-md-3 left_col">
        <div className="left_col">

          <div className="navbar nav_title">
            <a href="/" className="site_title"><span>Guacamole!</span></a>
          </div>
          <div className="clearfix"></div>

          <div className="profile">
            <div className="profile_pic">
              <img src="./Gentallela Alela! __files/img.jpg" alt="..." className="img-circle profile_img"></img>
            </div>
            <div className="profile_info">
              <span>Welcome, </span>
              <h2> { currentUser ? currentUser.profile.name : 'not logged in'}</h2>
              { navigation }
            </div>
          </div>
          <br />
          <div className="sidebar-footer hidden-small">
            <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Logout" aria-describedby="tooltip80235">
              <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
            </a>
          </div>
        </div>
      </div>)
  }
});
