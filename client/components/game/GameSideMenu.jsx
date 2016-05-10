GameSideMenu = React.createClass({
  propTypes: {
    gameId: React.PropTypes.string.isRequired,
  },
  mixins: [ReactMeteorData],
  getMeteorData(){
    var handle = Meteor.subscribe("games");
    // Bör börja med att endast fetcha ett game, göra en begränsning att inga nya spel kan överhuvudtaget skapas, endast ett som första version
    return {
      loading: ! handle.ready(),
      game: Roles.userIsInRole(Meteor.userId(), 'admin') ? Games.findOne() : Games.findOne( { players: Meteor.userId() } ), //({ id: this.props.gameId }),
      currentUser: Meteor.user(),
      isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin')
    };
  },
  render(){
    if (this.data.loading) {
      return <LoadingSpinner />;
    }

    let { game, currentUser, isAdmin } = this.data;
    var gameNavigation;

    if(isAdmin){
      gameNavigation = (<ul className="nav child_menu"><li>Administrator</li></ul>);
    }else {
      gameNavigation = (<ul className="nav child_menu">
        <li><a href={ "/game/" + game._id + "/start" }>Start</a></li>
        <li><a href={ "/game/" + game._id + "/toplist" }>Toplist</a></li>
      </ul>);
    }

    return (<div className="col-md-3 left_col">
        <div className="left_col">

          <div className="navbar nav_title">
            <a href="/" className="site_title"><span>{ game.name }</span></a>
          </div>
          <div className="clearfix"></div>

          <div className="profile">
            <div className="profile_pic">
              <img src="./Gentallela Alela! __files/img.jpg" alt="..." className="img-circle profile_img"></img>
            </div>
            <div className="profile_info">
              <span>Welcome, </span>
              <h2> { currentUser ? currentUser.profile.name : 'not logged in'}</h2>

            </div>
          </div>
          <br />
            <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
              <div className="menu_section">
                <h3>Game menu { game.name } </h3>
                <ul className="nav side-menu">
                  <li className="active"><a><i className="fa fa-home"></i> menu <span className="fa fa-chevron-down"></span></a>
                    { gameNavigation }
                  </li>
                </ul>
              </div>
            </div>

          <div className="sidebar-footer hidden-small">
            <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Logout" aria-describedby="tooltip80235">
              <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
            </a>
          </div>
        </div>
      </div>)
  }
});
